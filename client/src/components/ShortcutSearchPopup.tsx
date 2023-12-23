import { Container, HStack, Input, InputGroup, InputRightElement, Kbd } from '@chakra-ui/react';
import { useState } from 'react';

interface ShortcutSearchPopupProps {
  modifier: string;
  shortcutKey: string;
  label: string;
  onInput?: (value: string) => void;
  onChanged?: (value: string) => void;
  onEnter?: (value: string) => void;
}

export default function ShortcutSearchPopupProps({
  modifier,
  shortcutKey,
  label,
  onInput,
  onChanged,
  onEnter,
}: ShortcutSearchPopupProps) {
  const [inputValue, setInputValue] = useState('');

  return (
    <Container
      maxW="2xl"
      maxH="2xl"
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
    >
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
    </Container>
  );
}
