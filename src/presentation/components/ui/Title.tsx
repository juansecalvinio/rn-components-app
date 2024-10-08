import {useContext} from 'react';
import {Text} from 'react-native';
import {globalStyles} from '../../../config/theme/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThemeContext} from '../../context/ThemeContext';

interface Props {
  text: string;
  safe?: boolean;
}

export const Title = ({text, safe = false}: Props) => {
  const {colors} = useContext(ThemeContext);

  const {top} = useSafeAreaInsets();

  return (
    <Text
      style={{
        ...globalStyles.title,
        marginTop: safe ? top : 0,
        marginBottom: 10,
        color: colors.text,
      }}>
      {text}
    </Text>
  );
};
