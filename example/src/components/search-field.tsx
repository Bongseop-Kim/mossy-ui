import { TextInput } from 'mossy-ui';

type SearchFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export function SearchField({ value, onChangeText }: SearchFieldProps) {
  return (
    <TextInput
      defaultValue={value}
      onChangeText={onChangeText}
      placeholder="컴포넌트 검색"
      autoCapitalize="none"
      autoCorrect={false}
      enterKeyHint="search"
    />
  );
}
