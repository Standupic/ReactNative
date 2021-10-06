import * as React from 'react';
import { Button as PaperButton } from 'react-native-paper'
import { StyleSheet} from 'react-native'
 
type Props = React.ComponentProps<typeof PaperButton>

const Button = ({ mode, style, ...props }: Props) => {
    return (
        <PaperButton
            style={[
                styles.button,
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