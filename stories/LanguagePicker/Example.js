import React from 'react';
import {LanguagePicker} from 'wix-style-react';

const languageLocaleMap = {
  en: 'English',
  cs: 'Čeština',
  da: 'Dansk',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
  no: 'Norsk',
  pl: 'Polski',
  pt: 'Português',
  ru: 'Русский',
  sv: 'Svenska',
  ja: '日本語',
  ko: '한국어',
  tr: 'Türkçe',
  nl: 'Nederlands',
  hi: 'हिन्दी',
  zh: 'Chinese',
  th: 'Thai'
};

const mockDictionary = {
  en: 'Hello',
  cs: 'Ahoj',
  da: 'Hej',
  de: 'Hallo',
  fr: 'Bonjour',
  es: 'Hola',
  it: 'Ciao',
  no: 'Hallo',
  pl: 'cześć',
  pt: 'Olá',
  ru: 'Здравствуйте',
  sv: 'Hallå',
  ja: 'こんにちは',
  ko: '안녕하세요',
  tr: 'Merhaba',
  nl: 'Hallo',
  hi: 'नमस्ते',
  zh: '你好',
  th: 'สวัสดี'
};

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {languageKey: 'en'};
  }

  render() {
    return (
      <div style={{display: 'flex', alignItems: 'center', marginLeft: '30px'}} className="ltr">
        <LanguagePicker dataHook="story-languagePicker" selectedId={this.state.languageKey} onSelect={({id}) => this.setState({languageKey: id})}>
          {Object.keys(languageLocaleMap).map(languageKey =>
            <LanguagePicker.Option key={languageKey} languageKey={languageKey}>
              {languageLocaleMap[languageKey]}
            </LanguagePicker.Option>
          )}
        </LanguagePicker>
        <div id="languagePicker-output" style={{paddingBottom: '22px', marginLeft: '40px'}}><h1>{mockDictionary[this.state.languageKey]}</h1></div>
      </div>
    );
  }
}
