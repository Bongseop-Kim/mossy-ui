package com.mossyui

import android.graphics.Color as AndroidColor
import androidx.compose.foundation.layout.sizeIn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.ui.ModifierRegistry

class MossyUiModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("MossyUi")

    OnCreate {
      ModifierRegistry.register("mossySizeConstraints") { map, _, _, _ ->
        Modifier.sizeIn(
          minWidth = map.dp("minWidth") ?: 0.dp,
          minHeight = map.dp("minHeight") ?: 0.dp,
          maxWidth = map.dp("maxWidth") ?: androidx.compose.ui.unit.Dp.Infinity,
          maxHeight = map.dp("maxHeight") ?: androidx.compose.ui.unit.Dp.Infinity
        )
      }

      ModifierRegistry.register("mossyLinearGradientBackground") { map, _, _, _ ->
        val colors = map.colors("colors")
        if (colors.isEmpty()) {
          Modifier
        } else {
          val locations = map.floatList("locations")
          val colorStops = colors.mapIndexed { index, color ->
            (locations.getOrNull(index) ?: fallbackLocation(index, colors.size)) to color
          }.toTypedArray()
          val startPoint = map.point("startPoint", Offset.Zero)
          val endPoint = map.point("endPoint", Offset(1f, 1f))

          Modifier.drawBehind {
            drawRect(
              brush = Brush.linearGradient(
                colorStops = colorStops,
                start = Offset(size.width * startPoint.x, size.height * startPoint.y),
                end = Offset(size.width * endPoint.x, size.height * endPoint.y)
              )
            )
          }
        }
      }

      ModifierRegistry.register("mossyUnevenCornerRadius") { map, _, _, _ ->
        Modifier.clip(
          RoundedCornerShape(
            topStart = (map.dp("topLeft") ?: 0.dp),
            topEnd = (map.dp("topRight") ?: 0.dp),
            bottomEnd = (map.dp("bottomRight") ?: 0.dp),
            bottomStart = (map.dp("bottomLeft") ?: 0.dp)
          )
        )
      }

      ModifierRegistry.register("mossyDirectionalBorder") { map, _, _, _ ->
        val color = map.color("color") ?: return@register Modifier
        Modifier.drawBehind {
          val top = map.dp("top")?.toPx() ?: 0f
          val right = map.dp("right")?.toPx() ?: 0f
          val bottom = map.dp("bottom")?.toPx() ?: 0f
          val left = map.dp("left")?.toPx() ?: 0f

          if (top > 0f) {
            drawLine(color, Offset(0f, top / 2), Offset(size.width, top / 2), strokeWidth = top)
          }
          if (right > 0f) {
            drawLine(
              color,
              Offset(size.width - right / 2, 0f),
              Offset(size.width - right / 2, size.height),
              strokeWidth = right
            )
          }
          if (bottom > 0f) {
            drawLine(
              color,
              Offset(0f, size.height - bottom / 2),
              Offset(size.width, size.height - bottom / 2),
              strokeWidth = bottom
            )
          }
          if (left > 0f) {
            drawLine(color, Offset(left / 2, 0f), Offset(left / 2, size.height), strokeWidth = left)
          }
        }
      }
    }

    OnDestroy {
      ModifierRegistry.unregister("mossySizeConstraints")
      ModifierRegistry.unregister("mossyLinearGradientBackground")
      ModifierRegistry.unregister("mossyUnevenCornerRadius")
      ModifierRegistry.unregister("mossyDirectionalBorder")
    }
  }
}

private fun Map<String, Any?>.number(key: String): Float? = (this[key] as? Number)?.toFloat()

private fun Map<String, Any?>.dp(key: String) = number(key)?.dp

private fun Map<String, Any?>.floatList(key: String): List<Float> =
  (this[key] as? List<*>)?.mapNotNull { (it as? Number)?.toFloat() }.orEmpty()

private fun Map<String, Any?>.colors(key: String): List<Color> =
  (this[key] as? List<*>)?.mapNotNull { (it as? String)?.toComposeColor() }.orEmpty()

private fun Map<String, Any?>.color(key: String): Color? = (this[key] as? String)?.toComposeColor()

private fun Map<String, Any?>.point(key: String, fallback: Offset): Offset {
  val value = this[key] as? Map<*, *> ?: return fallback
  val x = (value["x"] as? Number)?.toFloat() ?: fallback.x
  val y = (value["y"] as? Number)?.toFloat() ?: fallback.y
  return Offset(x, y)
}

private fun String.toComposeColor(): Color? = runCatching {
  Color(AndroidColor.parseColor(expandShortHexColor()))
}.getOrNull()

private fun String.expandShortHexColor(): String {
  if (!startsWith("#")) return this

  return when (length) {
    4 -> "#${this[1]}${this[1]}${this[2]}${this[2]}${this[3]}${this[3]}"
    5 -> "#${this[4]}${this[4]}${this[1]}${this[1]}${this[2]}${this[2]}${this[3]}${this[3]}"
    else -> this
  }
}

private fun fallbackLocation(index: Int, count: Int): Float {
  return if (count <= 1) 0f else index.toFloat() / (count - 1).toFloat()
}
