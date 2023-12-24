import { Container, HStack, Input, InputGroup, InputRightElement, Kbd, Modal, ModalBody, ModalContent, ModalOverlay, isStyleProp } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ShortcutSearchInput from './ShortcutSearchInput';

interface ShortcutSearchPopupProps {
  modifier: string;
  shortcutKey: string;
  label: string;
  isOpen: boolean,
  setIsOpen: (value: boolean) => void;
  onInput?: (value: string) => void;
  onChanged?: (value: string) => void;
  onEnter?: (value: string) => void;
}

export default function ShortcutSearchPopupProps({
  modifier,
  shortcutKey,
  label,
  isOpen,
  setIsOpen,
  onInput,
  onChanged,
  onEnter,
}: ShortcutSearchPopupProps) {
  const [inputValue, setInputValue] = useState('');

useEffect(() => {
  function handleEscapeClose(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }

  window.addEventListener('keyup', handleEscapeClose, false);

  return () => {
    window.addEventListener('keyup', handleEscapeClose, false);
  }
  }, [setIsOpen])

  if (!isOpen) {
    return <></>
  }

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={() => {}} >
      <ModalOverlay />
      <ModalContent maxW='50%'>
        <ModalBody>
          <ShortcutSearchInput modifier={modifier} shortcutKey={shortcutKey} label={label} inputValue={inputValue} setInputValue={setInputValue} onInput={onInput} onChanged={onChanged} onEnter={onEnter} />
        </ModalBody>
      </ModalContent>
    </Modal>
      )
}
