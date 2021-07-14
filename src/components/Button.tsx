import * as React from 'react';
import { Button as PaperButton } from 'react-native-paper'
import { StyleSheet} from 'react-native'
import { theme } from '../core/theme'
 
type Props = React.ComponentProps<typeof PaperButton>

const Button = ({ mode, style, ...props }: Props) => {
    return (
        <PaperButton
            style={[
                styles.button,
                mode === 'outlined' && { backgroundColor: theme.colors.surface },
                style,
            ]}
            labelStyle={styles.text}
            mode={mode}
            {...props}
        />
    )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
})

export default Button;