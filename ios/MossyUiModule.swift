import ExpoModulesCore
import ExpoUI
import SwiftUI

public class MossyUiModule: Module {
  public func definition() -> ModuleDefinition {
    Name("MossyUi")

    OnCreate {
      ViewModifierRegistry.register("mossySizeConstraints") { params, appContext, _ in
        try MossySizeConstraintsModifier(from: params, appContext: appContext)
      }
      ViewModifierRegistry.register("mossyLinearGradientBackground") { params, appContext, _ in
        try MossyLinearGradientBackgroundModifier(from: params, appContext: appContext)
      }
      ViewModifierRegistry.register("mossyUnevenCornerRadius") { params, appContext, _ in
        try MossyUnevenCornerRadiusModifier(from: params, appContext: appContext)
      }
      ViewModifierRegistry.register("mossyDirectionalBorder") { params, appContext, _ in
        try MossyDirectionalBorderModifier(from: params, appContext: appContext)
      }
    }

    OnDestroy {
      ViewModifierRegistry.unregister("mossySizeConstraints")
      ViewModifierRegistry.unregister("mossyLinearGradientBackground")
      ViewModifierRegistry.unregister("mossyUnevenCornerRadius")
      ViewModifierRegistry.unregister("mossyDirectionalBorder")
    }
  }
}

struct MossySizeConstraintsModifier: ViewModifier, Record {
  @Field var minWidth: CGFloat?
  @Field var maxWidth: CGFloat?
  @Field var minHeight: CGFloat?
  @Field var maxHeight: CGFloat?

  func body(content: Content) -> some View {
    content.frame(
      minWidth: minWidth,
      maxWidth: maxWidth,
      minHeight: minHeight,
      maxHeight: maxHeight
    )
  }
}

struct MossyGradientPoint: Record {
  @Field var x: CGFloat = 0
  @Field var y: CGFloat = 0
}

struct MossyLinearGradientBackgroundModifier: ViewModifier, Record {
  @Field var colors: [Color] = []
  @Field var locations: [Double] = []
  @Field var startPoint: MossyGradientPoint = MossyGradientPoint()
  @Field var endPoint: MossyGradientPoint = MossyGradientPoint()

  func body(content: Content) -> some View {
    if colors.isEmpty {
      content
    } else {
      content.background(
        LinearGradient(
          stops: gradientStops,
          startPoint: UnitPoint(x: startPoint.x, y: startPoint.y),
          endPoint: UnitPoint(x: endPoint.x, y: endPoint.y)
        )
      )
    }
  }

  private var gradientStops: [Gradient.Stop] {
    colors.enumerated().map { index, color in
      Gradient.Stop(color: color, location: locations[safe: index] ?? fallbackLocation(index))
    }
  }

  private func fallbackLocation(_ index: Int) -> Double {
    colors.count <= 1 ? 0 : Double(index) / Double(colors.count - 1)
  }
}

struct MossyUnevenCornerRadiusModifier: ViewModifier, Record {
  @Field var topLeft: CGFloat?
  @Field var topRight: CGFloat?
  @Field var bottomRight: CGFloat?
  @Field var bottomLeft: CGFloat?

  func body(content: Content) -> some View {
    content.clipShape(
      MossyUnevenRoundedRectangle(
        topLeft: topLeft ?? 0,
        topRight: topRight ?? 0,
        bottomRight: bottomRight ?? 0,
        bottomLeft: bottomLeft ?? 0
      )
    )
  }
}

struct MossyDirectionalBorderModifier: ViewModifier, Record {
  @Field var color: Color = .clear
  @Field var top: CGFloat?
  @Field var right: CGFloat?
  @Field var bottom: CGFloat?
  @Field var left: CGFloat?

  func body(content: Content) -> some View {
    content.overlay {
      GeometryReader { geometry in
        let size = geometry.size
        ZStack {
          if let top, top > 0 {
            Rectangle()
              .fill(color)
              .frame(width: size.width, height: top)
              .position(x: size.width / 2, y: top / 2)
          }
          if let right, right > 0 {
            Rectangle()
              .fill(color)
              .frame(width: right, height: size.height)
              .position(x: size.width - right / 2, y: size.height / 2)
          }
          if let bottom, bottom > 0 {
            Rectangle()
              .fill(color)
              .frame(width: size.width, height: bottom)
              .position(x: size.width / 2, y: size.height - bottom / 2)
          }
          if let left, left > 0 {
            Rectangle()
              .fill(color)
              .frame(width: left, height: size.height)
              .position(x: left / 2, y: size.height / 2)
          }
        }
      }
      .allowsHitTesting(false)
    }
  }
}

struct MossyUnevenRoundedRectangle: Shape {
  var topLeft: CGFloat
  var topRight: CGFloat
  var bottomRight: CGFloat
  var bottomLeft: CGFloat

  func path(in rect: CGRect) -> Path {
    let topLeft = min(topLeft, min(rect.width, rect.height) / 2)
    let topRight = min(topRight, min(rect.width, rect.height) / 2)
    let bottomRight = min(bottomRight, min(rect.width, rect.height) / 2)
    let bottomLeft = min(bottomLeft, min(rect.width, rect.height) / 2)

    var path = Path()
    path.move(to: CGPoint(x: rect.minX + topLeft, y: rect.minY))
    path.addLine(to: CGPoint(x: rect.maxX - topRight, y: rect.minY))
    path.addArc(
      center: CGPoint(x: rect.maxX - topRight, y: rect.minY + topRight),
      radius: topRight,
      startAngle: .degrees(-90),
      endAngle: .degrees(0),
      clockwise: false
    )
    path.addLine(to: CGPoint(x: rect.maxX, y: rect.maxY - bottomRight))
    path.addArc(
      center: CGPoint(x: rect.maxX - bottomRight, y: rect.maxY - bottomRight),
      radius: bottomRight,
      startAngle: .degrees(0),
      endAngle: .degrees(90),
      clockwise: false
    )
    path.addLine(to: CGPoint(x: rect.minX + bottomLeft, y: rect.maxY))
    path.addArc(
      center: CGPoint(x: rect.minX + bottomLeft, y: rect.maxY - bottomLeft),
      radius: bottomLeft,
      startAngle: .degrees(90),
      endAngle: .degrees(180),
      clockwise: false
    )
    path.addLine(to: CGPoint(x: rect.minX, y: rect.minY + topLeft))
    path.addArc(
      center: CGPoint(x: rect.minX + topLeft, y: rect.minY + topLeft),
      radius: topLeft,
      startAngle: .degrees(180),
      endAngle: .degrees(270),
      clockwise: false
    )
    path.closeSubpath()
    return path
  }
}

extension Array {
  subscript(safe index: Int) -> Element? {
    indices.contains(index) ? self[index] : nil
  }
}
