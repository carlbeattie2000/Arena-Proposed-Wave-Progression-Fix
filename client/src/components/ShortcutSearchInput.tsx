import { InputGroup, Input, InputRightElement, HStack, Kbd } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

interface ShortcutSearchInputProps {
  modifier: string;
  shortcutKey: string;
  label: string;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  onInput?: (value: string) => void;
  onChanged?: (value: string) => void;
  onEnter?: (value: string) => void;
}

export default function ShortcutSearchInput({
  modifier,
  shortcutKey,
  label,
  inputValue,
  setInputValue,
  onInput,
  onChanged,
  onEnter,
}: ShortcutSearchInputProps) {
  return (
    <InputGroup size="lg">
      <Input
        value={inputValue}
        variant="filled"
        size="lg"
        placeholder={label}
        onInput={(e) => {
          setInputValue(e.currentTarget.value);

          if (onInput) {
            onInput(e.currentTarget.value);
          }
        }}
        onChange={(e) => {
          if (onChanged) {
            onChanged(e.currentTarget.value);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'enter') {
            if (onEnter) {
              onEnter(e.currentTarget.value);
            }
          }
        }}
      />
      <InputRightElement w="auto" mr="2" pointerEvents="none">
        <HStack spacing="3">
          <Kbd>{modifier}</Kbd> <span>+</span> <Kbd>{shortcutKey}</Kbd>
        </HStack>
      </InputRightElement>
    </InputGroup>
  );
}
