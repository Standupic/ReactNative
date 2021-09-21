import React from 'react'
import {View, StyleSheet, Text, Animated} from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../core/theme'
import {TextInputProps} from "react-native-paper/lib/typescript/components/TextInput/TextInput";
import { Field, FieldProps} from 'formik';

interface ITextInput extends TextInputProps {
  description?: string,
  errorText?: string,
  name: string
  label: string
  required?: boolean
}

type Value = any

export default function TextInput({ errorText, description, name, label, required, ...props }: Omit<ITextInput, 'theme'>) {
  const onChangeRef = React.useRef<any>();
  
  return (
    <View style={styles.container}>
        <Field name={name}>
          {(FieldProps: FieldProps<Value>) => {
              const { field, form, meta } = FieldProps;
              if(!onChangeRef.current){
                onChangeRef.current = ((value: Value) => {
                  form.setFieldValue(field.name, value)
                })
              }
              return (
                  <View>
                    <Input
                        style={styles.input}
                        selectionColor={theme.colors.primary}
                        underlineColor="transparent"
                        mode="outlined"
                        label={label}
                        value={field.value}
                        error={meta.touched && !!meta.error}
                        onChangeText={onChangeRef.current}
                        {...props}
                    />
                    {meta.touched && !!meta.error ? <Text style={styles.error}>{meta.error}</Text> : null}
                  </View>
              )
          }}      
        </Field>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    width: '100%',  
    backgroundColor: theme.colors.surface,
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
})
