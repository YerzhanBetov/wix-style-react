import React from 'react';
import PropTypes from 'prop-types';

import CloseThin from './../Icons/dist/components/CloseThin';
import ArrowDownThin from './../Icons/dist/components/ArrowDownThin';
import Search4 from './../Icons/dist/components/Search4';
import ThemedInputErrorSuffix from './ThemedInputErrorSuffix';
import ThemedInputHelpSuffix from './ThemedInputHelpSuffix';

import styles from './Input.scss';

const isFixVisible = fix => fix.isVisible;

const suffixRules = {
  inputErrorSuffix: ({error, disabled}) => error && !disabled,
  inputHelpSuffix: ({help, disabled}) => help && !disabled,
  magnifyingGlass: ({magnifyingGlass, isClearButtonVisible, error}) => magnifyingGlass && !isClearButtonVisible && !error,
  clearButton: ({isClearButtonVisible}) => isClearButtonVisible,
  menuArrow: ({menuArrow, isClearButtonVisible, error, magnifyingGlass}) => menuArrow && !isClearButtonVisible && !error && !magnifyingGlass,
  unitSeparator: ({unit}) => !!unit,
  unit: ({unit}) => !!unit,
  customSuffix: ({suffix}) => !!suffix
};

const getVisibleSuffixCount = args =>
   Object.keys(suffixRules).map(key => suffixRules[key])
    .map(fn => fn(args))
    .filter(x => x)
    .length;

const InputSuffix = ({theme, errorMessage, error, disabled, help, helpMessage, onIconClicked,
      magnifyingGlass, isClearButtonVisible, onClear, menuArrow, unit, suffix, focused,
      tooltipPlacement, onTooltipShow
}) => {

  const suffixes = [
    {
      component: () => <ThemedInputErrorSuffix theme={theme} focused={focused} errorMessage={errorMessage} tooltipPlacement={tooltipPlacement} onTooltipShow={onTooltipShow}/>,
      isVisible: suffixRules.inputErrorSuffix({error, disabled})
    },
    {
      component: () => <ThemedInputHelpSuffix theme={theme} help={help} helpMessage={helpMessage} tooltipPlacement={tooltipPlacement} onTooltipShow={onTooltipShow}/>,
      isVisible: suffixRules.inputHelpSuffix({help, disabled})
    },
    {
      component: () =>
        <div className={styles.magnifyingGlass} disabled={disabled} onClick={onIconClicked}>
          <Search4 size={'18px'}/>
        </div>,
      isVisible: suffixRules.magnifyingGlass({magnifyingGlass, isClearButtonVisible, error})
    },
    {
      component: () =>
        <div onClick={onClear} className={styles.clearButton} data-hook="input-clear-button">
          <CloseThin size="8px"/>
        </div>,
      isVisible: suffixRules.clearButton({isClearButtonVisible})
    },
    {
      component: () => <div className={styles.unitSeparator}/>,
      isVisible: suffixRules.unitSeparator({unit})
    },
    {
      component: () => <div className={styles.unit} onClick={onIconClicked}>{unit}</div>,
      isVisible: suffixRules.unit({unit})
    },
    {
      component: () => suffix,
      isVisible: suffixRules.customSuffix({suffix})
    },
    {
      component: () =>
        <div className={styles.menuArrow} disabled={disabled} onClick={onIconClicked}>
          <ArrowDownThin size={'0.6em'}/>
        </div>,
      isVisible: suffixRules.menuArrow({menuArrow, isClearButtonVisible, error, magnifyingGlass})
    }
  ].filter(isFixVisible);


  return (<div className={styles.suffixes}>
    { suffixes.map((s, i) =>
      <div key={i} className={styles.suffix}>
        {s.component()}
      </div>
    )}
  </div>);
};

InputSuffix.propTypes = {
  suffixes: PropTypes.arrayOf(PropTypes.shape({
    component: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired
  })),
  theme: PropTypes.oneOf(['normal', 'paneltitle', 'material', 'amaterial', 'flat', 'flatdark']),
  errorMessage: PropTypes.node.isRequired,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  help: PropTypes.bool,
  helpMessage: PropTypes.node,
  onIconClicked: PropTypes.func,
  magnifyingGlass: PropTypes.bool,
  isClearButtonVisible: PropTypes.bool,
  onClear: PropTypes.func,
  menuArrow: PropTypes.bool,
  unit: PropTypes.string,
  suffix: PropTypes.node,
  focused: PropTypes.bool,
  tooltipPlacement: PropTypes.string,
  onTooltipShow: PropTypes.func
};

export default InputSuffix;
export {getVisibleSuffixCount};
