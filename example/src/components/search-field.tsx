import { TextField } from 'mossy-ui';

type SearchFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export function SearchField({ value, onChangeText }: SearchFieldProps) {
  return (
    <TextField.Root defaultValue={value} onValueChange={onChangeText}>
      <TextField.Input
        placeholder="컴포넌트 검색"
        autoCapitalize="none"
        autoCorrect={false}
        enterKeyHint="search"
      />
    </TextField.Root>
  );
}
