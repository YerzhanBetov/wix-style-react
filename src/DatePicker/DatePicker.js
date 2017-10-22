import React from 'react';
import WixComponent from '../BaseComponents/WixComponent';
import PropTypes from 'prop-types';
import ReactDatepicker from 'react-datepicker';
import DatePickerInput from './DatePickerInput';
import moment from 'moment';
import classnames from 'classnames';
import css from './DatePicker.scss';

/**
  * DatePicker component
  *
  * ### Keyboard support
  * * `Left`: Move to the previous day.
  * * `Right`: Move to the next day.
  * * `Up`: Move to the previous week.
  * * `Down`: Move to the next week.
  * * `PgUp`: Move to the previous month.
  * * `PgDn`: Move to the next month.
  * * `Home`: Move to the previous year.
  * * `End`: Move to the next year.
  * * `Enter`/`Esc`/`Tab`: close the calendar. (`Enter` & `Esc` calls `preventDefault`)
  *
  */
export default class DatePicker extends WixComponent {
  static displayName = 'DatePicker';

  static propTypes = {
    /** Can provide Input with your custom props */
    customInput: PropTypes.node,
    dataHook: PropTypes.string,

    /** Custom date format */
    dateFormat: PropTypes.string,

    /** Is the DatePicker disabled */
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,

    /** Past dates are unselectable */
    excludePastDates: PropTypes.bool,

    /** Only the truthy dates are selectable */
    filterDate: PropTypes.func,

    /** dataHook for the DatePicker's Input */
    inputDataHook: PropTypes.string,

    /** Called upon every value change */
    onChange: PropTypes.func.isRequired,
    onEnterPressed: PropTypes.func,

    /** placeholder of the Input */
    placeholderText: PropTypes.string,

    /** Icon for the DatePicker's Input */
    prefix: PropTypes.node,

    /** Is the input field readOnly */
    readOnly: PropTypes.bool,

    /** RTL mode */
    rtl: PropTypes.bool,

    /** Display a selectable yearDropdown */
    showYearDropdown: PropTypes.bool,

    /** Display a selectable monthDropdown */
    showMonthDropdown: PropTypes.bool,

    style: PropTypes.object,

    /** Theme of the Input */
    theme: PropTypes.string,

    /** The selected date */
    value: PropTypes.object,

    /** should the calendar close on day selection */
    shouldCloseOnSelect: PropTypes.bool,

    /** controls the whether the calendar will be visible or not */
    isOpen: PropTypes.bool,

    /** called when calendar visibility changes */
    setOpen: PropTypes.func
  };

  static defaultProps = {
    style: {
      width: 150
    },

    filterDate: () => true,
    shouldCloseOnSelect: true
  };

  constructor(props) {
    super(props);
    this.filterDate = this.filterDate.bind(this);
  }

  filterDate(date) {
    if (this.props.excludePastDates) {
      if (date < moment().startOf('d')) {
        return false;
      }
    }

    return this.props.filterDate(date);
  }

  renderInput() {
    const {
      rtl, style, theme, prefix, inputDataHook: dataHook, onEnterPressed,
      error, errorMessage, customInput
    } = this.props;

    return (
      <DatePickerInput
        {...{
          rtl,
          style,
          theme,
          prefix,
          dataHook,
          onEnterPressed,
          error,
          errorMessage,
          customInput
        }}
        />
    );
  }

  render() {
    const cssClasses = [css.wrapper];
    if (this.props.showYearDropdown || this.props.showMonthDropdown) {
      cssClasses.push({'react-datepicker--hide-header': true});
    } else {
      cssClasses.push({'react-datepicker--hide-header__dropdown': true});
    }
    return (
      <div className={classnames(cssClasses)}>
        <ReactDatepicker
          {...this.props}
          selected={this.props.value}
          onChange={val => {
            if (this.filterDate(val)) {
              this.props.onChange(val);
            }
          }}
          customInput={this.renderInput()}
          filterDate={this.filterDate}
          readOnly={this.props.readOnly}
          showYearDropdown={this.props.showYearDropdown}
          scrollableYearDropdown
          />
      </div>
    );
  }
}
