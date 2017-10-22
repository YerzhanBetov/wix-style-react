# FloatingTabs component

> General Floating Tabs for TPA

## FloatingTabs Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
|activeId  |string    |-          |false       |If empty, first tab will be selected |
|onChange  |function  |-          |false        |Invoked on tab change and returns selected tab id|
|tabClassName|string  |-         |false        |Css class to override tab style|
|contentClassName|string  |-         |false        |Css class to override content style|
|activeTabClassName|string|-      |false| Css class for active tab

## FloatingTabItem Properties
| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
|id        |string    |-             |true         |Unique tab id|
|title     |string    |-             |true         |Tab title|
