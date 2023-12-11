import {setYear} from 'date-fns';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {View} from 'react-native';
import * as Expensicons from '@components/Icon/Expensicons';
import TextInput from '@components/TextInput';
import {propTypes as baseTextInputPropTypes, defaultProps as defaultBaseTextInputPropTypes} from '@components/TextInput/BaseTextInput/baseTextInputPropTypes';
import withLocalize, {withLocalizePropTypes} from '@components/withLocalize';
import useThemeStyles from '@styles/useThemeStyles';
import CONST from '@src/CONST';
import CalendarPicker from './CalendarPicker';

const propTypes = {
    /**
     * The datepicker supports any value that `new Date()` can parse.
     * `onInputChange` would always be called with a Date (or null)
     */
    value: PropTypes.string,

    /**
     * The datepicker supports any defaultValue that `new Date()` can parse.
     * `onInputChange` would always be called with a Date (or null)
     */
    defaultValue: PropTypes.string,

    inputID: PropTypes.string.isRequired,

    /** A minimum date of calendar to select */
    minDate: PropTypes.objectOf(Date),

    /** A maximum date of calendar to select */
    maxDate: PropTypes.objectOf(Date),

    /** A function that is passed by FormWrapper */
    onInputChange: PropTypes.func.isRequired,

    /** A function that is passed by FormWrapper */
    onTouched: PropTypes.func.isRequired,

    ...withLocalizePropTypes,
    ...baseTextInputPropTypes,
};

const datePickerDefaultProps = {
    ...defaultBaseTextInputPropTypes,
    minDate: setYear(new Date(), CONST.CALENDAR_PICKER.MIN_YEAR),
    maxDate: setYear(new Date(), CONST.CALENDAR_PICKER.MAX_YEAR),
    value: undefined,
};

function DatePicker({containerStyles, defaultValue, disabled, errorText, inputID, isSmallScreenWidth, label, maxDate, minDate, onInputChange, onTouched, placeholder, translate, value}) {
    const styles = useThemeStyles();
    const [selectedDate, setSelectedDate] = useState(value || defaultValue || undefined);

    const onSelected = (newValue) => {
        if (_.isFunction(onTouched)) {
            onTouched();
        }
        if (_.isFunction(onInputChange)) {
            onInputChange(newValue);
        }
        setSelectedDate(newValue);
    };

    return (
        <View style={styles.datePickerRoot}>
            <View style={[isSmallScreenWidth ? styles.flex2 : {}, styles.pointerEventsNone]}>
                <TextInput
                    inputID={inputID}
                    forceActiveLabel
                    icon={Expensicons.Calendar}
                    label={label}
                    accessibilityLabel={label}
                    role={CONST.ACCESSIBILITY_ROLE.TEXT}
                    value={selectedDate}
                    placeholder={placeholder || translate('common.dateFormat')}
                    errorText={errorText}
                    containerStyles={containerStyles}
                    textInputContainerStyles={[styles.borderColorFocus]}
                    inputStyle={[styles.pointerEventsNone]}
                    disabled={disabled}
                    readOnly
                />
            </View>
            <View style={[styles.datePickerPopover, styles.border]}>
                <CalendarPicker
                    minDate={minDate}
                    maxDate={maxDate}
                    value={selectedDate}
                    onSelected={onSelected}
                />
            </View>
        </View>
    );
}

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = datePickerDefaultProps;
DatePicker.displayName = 'DatePicker';

export default withLocalize(DatePicker);
