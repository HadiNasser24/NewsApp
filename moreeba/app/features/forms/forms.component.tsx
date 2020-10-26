import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text } from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';

import { ErrorLabel } from '&styled/labels/errorLabel.styled';
import { storeData, loadData } from '&realm';
import { formActions } from './forms.slice';

const FormsComponent = () => {
  const [buttonTitle, setButtonTitle] = useState('Submit');
  const [title, setTitle] = useState('FormsContainer');

  const initialFormValue = {
    firstName: loadData('firstName'),
    lastName: loadData('lastName'),
    phoneNumber: loadData('phoneNumber'),
    email: loadData('email'),
    password: loadData('password'),
  };

  const submitHandler = (values: typeof initialFormValue) => {
    storeData('firstName', values.firstName);
    storeData('lastName', values.lastName);
    storeData('phoneNumber', values.phoneNumber);
    storeData('email', values.email);
  };

  const firstNameRef = React.useRef<TextInput>(null);
  const lastNameRef = React.useRef<TextInput>(null);
  const phoneNumberRef = React.useRef<TextInput>(null);
  const emailRef = React.useRef<TextInput>(null);
  const passowrdRef = React.useRef<TextInput>(null);

  const validation = yup.object().shape({
    firstName: yup
      .string()
      .min(3, 'too short first name')
      .required('Please provide your first name'),
    lastName: yup
      .string()
      .min(3, 'too short last names')
      .required('Please provide your last name'),
    phoneNumber: yup
      .string()
      .min(8, 'too short phone number')
      .required('Please provide your phone number'),
    email: yup.string().email().required('email field is required'),
    password: yup.string().min(6, 'password is too short').required(),
  });

  const initialValues = initialFormValue;

  return (
    <View style={styles.conatiner}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          submitHandler(values);
        }}
        validationSchema={validation}>
        {(formik) => (
          <React.Fragment>
            <View style={styles.row}>
              <Text>First Name: </Text>
              <TextInput
                ref={firstNameRef}
                blurOnSubmit={false}
                placeholder="John"
                returnKeyType="next"
                value={formik.values.firstName}
                onChangeText={formik.handleChange('firstName')}
                onSubmitEditing={() => {
                  lastNameRef.current?.focus();
                }}
                onBlur={() => {
                  formik.setFieldTouched('firstName');
                }}
              />
            </View>
            <ErrorLabel
              fontSize={14}
              show={
                formik.touched.firstName && formik.errors.firstName
                  ? true
                  : false
              }>
              {formik.errors.firstName}
            </ErrorLabel>
            <View style={styles.row}>
              <Text>Last Name: </Text>
              <TextInput
                ref={lastNameRef}
                blurOnSubmit={false}
                placeholder="Doe"
                returnKeyType="next"
                value={formik.values.lastName}
                onChangeText={formik.handleChange('lastName')}
                onSubmitEditing={() => {
                  phoneNumberRef.current?.focus();
                }}
                onBlur={() => {
                  formik.setFieldTouched('lastName');
                }}
              />
            </View>
            <ErrorLabel
              fontSize={14}
              show={
                formik.touched.lastName && formik.errors.lastName ? true : false
              }>
              {formik.errors.lastName}
            </ErrorLabel>
            <View style={styles.row}>
              <Text>Phone Number: </Text>
              <TextInput
                ref={phoneNumberRef}
                blurOnSubmit={false}
                placeholder="+96176543210"
                returnKeyType="next"
                keyboardType="phone-pad"
                value={formik.values.phoneNumber}
                onChangeText={formik.handleChange('phoneNumber')}
                onSubmitEditing={() => {
                  emailRef.current?.focus();
                }}
                onBlur={() => {
                  formik.setFieldTouched('phoneNumber');
                }}
              />
            </View>
            <ErrorLabel
              fontSize={14}
              show={
                formik.touched.phoneNumber && formik.errors.phoneNumber
                  ? true
                  : false
              }>
              {formik.errors.phoneNumber}
            </ErrorLabel>
            <View style={styles.row}>
              <Text>Email: </Text>
              <TextInput
                ref={emailRef}
                blurOnSubmit={false}
                keyboardType="email-address"
                returnKeyType="next"
                placeholder="Email"
                value={formik.values.email}
                onChangeText={formik.handleChange('email')}
                onSubmitEditing={() => {
                  passowrdRef.current?.focus();
                }}
                onBlur={() => {
                  formik.setFieldTouched('email');
                }}
              />
            </View>
            <ErrorLabel
              fontSize={14}
              show={formik.touched.email && formik.errors.email ? true : false}>
              {formik.errors.email}
            </ErrorLabel>
            <View style={styles.row}>
              <Text>Password: </Text>
              <TextInput
                ref={passowrdRef}
                placeholder="Password"
                secureTextEntry
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
              />
            </View>
            <ErrorLabel
              fontSize={14}
              show={
                formik.touched.password && formik.errors.password ? true : false
              }>
              {formik.errors.password}
            </ErrorLabel>
            <Button title={buttonTitle} onPress={formik.handleSubmit} />
          </React.Fragment>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

/**
 * Maps state variables from redux store to props of currect component
 * @param state
 */
const mapStateToProps = (state: RootState) => ({
  // Map your redux state to your props here
});

/**
 * Maps actions from slices to props
 */
const mapDispatchToProps = {
  // map your actions here ex:
  // increment : counterActions.increment
  logout: formActions.reset,
};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const FormsComponentRedux = connector(FormsComponent);

export { FormsComponentRedux as FormsComponent };
