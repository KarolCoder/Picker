import {memo} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';

export type MessageOverlayProps = {
  message: string;
  positiveText?: string;
  onPositivePress?: () => void;
  onNegativePress: () => void;
};

const MessageOverlay = ({
  message,
  positiveText,
  onPositivePress,
  onNegativePress,
}: MessageOverlayProps) => {
  return (
    <Modal>
      <View style={{paddingTop: 100}}>
        <Text>{message}</Text>
        {!!positiveText && (
          <TouchableOpacity style={{padding: 20}} onPress={onPositivePress}>
            <Text>{positiveText}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={{padding: 20}} onPress={onNegativePress}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default memo(MessageOverlay);
