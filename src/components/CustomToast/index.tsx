import {Snackbar, Portal} from 'react-native-paper';
import sizeHelper from '../../utils/Helpers';
import { colors } from '../../utils/Themes';

type Props = {
  isVisable?: any;
  setIsVisable?: any;
  color?: string;
  message: string;
  marginBottom?: any;
  duration?: any;
  backgroundColor?:any
};

const CustomToast = ({
  message,
  isVisable,
  setIsVisable,
  color,
  duration,
  marginBottom,
  backgroundColor
}: Props) => {
  return (
    <Snackbar
      duration={duration || 3700}
      style={{
        backgroundColor: backgroundColor||colors.red,
        marginBottom: marginBottom || sizeHelper.calHp(20),
        borderRadius: sizeHelper.calWp(15),
        // height:50
      }}
      visible={isVisable}
      onDismiss={() => setIsVisable(false)}
      action={{
        label: 'OKAY',
        textColor: color || colors.white,

        onPress: () => setIsVisable(false),
      }}>
      {message}
    </Snackbar>
  );
};
export default CustomToast;
