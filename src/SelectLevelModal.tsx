import {memo} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';

type SelectLevelModalProps = {
  visible: boolean;
  onPress: (level: number) => void;
};

export const SelectLevelModal = ({visible, onPress}: SelectLevelModalProps) => {
  if (!visible) {
    return null;
  }
  return (
    <Modal>
      <View style={{paddingTop: 100}}>
        <Text>select Level</Text>
        <TouchableOpacity style={{padding: 20}} onPress={() => onPress(1)}>
          <Text>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 20}} onPress={() => onPress(2)}>
          <Text>2</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default memo(SelectLevelModal);
