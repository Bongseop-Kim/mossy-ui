import { Host, Icon as ExpoIcon } from "@expo/ui";
import { Stack } from "expo-router";
import { useState } from "react";

import { VStack, useMossyTheme } from "mossy-ui";

import { useShowcaseMode } from "./_layout";
import { ComponentList } from "../src/components/component-list";
import { SearchField } from "../src/components/search-field";
import { showcaseComponents } from "../src/data";

const themeModeIcons = {
  dark: ExpoIcon.select({
    ios: "moon",
    android: require("../src/assets/icons/moon.xml"),
  }),
  light: ExpoIcon.select({
    ios: "sun.max",
    android: require("../src/assets/icons/sun.xml"),
  }),
} as const;

export default function ComponentsIndexScreen() {
  const theme = useMossyTheme();
  const { mode, setMode } = useShowcaseMode();
  const [search, setSearch] = useState("");
  const normalizedSearch = search.trim().toLowerCase();
  const nextMode = mode === "light" ? "dark" : "light";

  const filteredComponents =
    normalizedSearch.length === 0
      ? showcaseComponents
      : showcaseComponents.filter((item) =>
          item.name.toLowerCase().includes(normalizedSearch),
        );

  return (
    <>
      <Stack.Toolbar placement="right" tintColor={theme.color.fg.neutral}>
        <Stack.Toolbar.Button
          accessibilityLabel={
            mode === "light" ? "다크 모드로 전환" : "라이트 모드로 전환"
          }
          icon={mode === "light" ? themeModeIcons.dark : themeModeIcons.light}
          onPress={() => setMode(nextMode)}
        />
      </Stack.Toolbar>
      <Host
        colorScheme={mode}
        style={{
          flex: 1,
          backgroundColor: theme.color.bg.layerBasement,
        }}
      >
        <VStack p="spacingX.globalGutter">
          <SearchField value={search} onChangeText={setSearch} />
          <ComponentList components={filteredComponents} />
        </VStack>
      </Host>
    </>
  );
}
