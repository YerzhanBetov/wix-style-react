import React from 'react';
import PropTypes from 'prop-types';
import styles from './FilePicker.scss';
import WixComponent from '../BaseComponents/WixComponent';
import Add from '../Icons/dist/components/Add';
import uniqueId from 'lodash/uniqueId';

/**
  * File picker component
  */
class FilePicker extends WixComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedFileName: props.subLabel
    };
    this.id = props.id || uniqueId('file_picker_input_');
  }

  onChooseFile(file) {
    const {maxSize, onChange} = this.props;

    if (file) {
      onChange(file);
      if (file.size <= maxSize) {
        this.setState({selectedFileName: file.name});
      }
    }
  }

  render() {
    const {header, mainLabel, supportedFormats, error, errorMessage} = this.props;

    return (
      <div>
        {header && (<span className={styles.header}>{header}</span>)}
        <label className={styles.label} htmlFor={this.id}>
          <div className={styles.icon}><Add width="42" height="42"/></div>
          <div className={styles.content}>
            <span className={styles.cta} data-hook="main-label">{mainLabel}</span>
            <span className={styles.info} data-hook="sub-label">{this.state.selectedFileName}</span>
            {error && <span className={styles.error} data-hook="filePicker-error">{errorMessage}</span>}
          </div>
        </label>
        <input id={this.id} className={styles.input} type="file" accept={supportedFormats} onChange={e => this.onChooseFile(e.target.files[0])}/>
      </div>
    );
  }
}

FilePicker.displayName = 'FilePicker';

FilePicker.defaultProps = {
  mainLabel: 'Choose File',
  subLabel: 'No file chosen (Max size 5 MB)',
  onChange: () => {},
  supportedFormats: '*',
  errorMessage: '',
  maxSize: 5000000  //5MB
};

FilePicker.propTypes = {
  /** Some text that will appear above the Icon */
  header: PropTypes.string,

  /** Callback function for when a file is uploaded */
  onChange: PropTypes.func,

  /** Some text that will appear as a main label besides the Icon */
  mainLabel: PropTypes.string,

  /** Some text that will appear as a sub label besides the Icon   */
  subLabel: PropTypes.string,

  /** supported formats seperated by comma (.png, .pdf) */
  supportedFormats: PropTypes.string,

  /** Max size of file allowed */
  maxSize: PropTypes.number,

  /** should present error */
  error: PropTypes.bool,

  /** error message to present */
  errorMessage: PropTypes.string,

  /** id for the filePicker */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default FilePicker;
