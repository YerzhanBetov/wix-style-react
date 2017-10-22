# SideMenu

A collection of dumb components for easy side menu combination.

You can use the [DrillView](./DrillView)

yet to be done:

* RTL

## Components

### Header `<SideMenu.Header/>` (alias: `<SideMenu.Logo/>`)

Container for your header (or anything you want)

| propName | propType | defaultValue | isRequired | description |
| -        | -        | -            | -          | -           |
| onClick  | func     | -            | -          | -           |
| children | node     | -            | -          | -           |


### Navigation `<SideMenu.Navigation/>`

Container for `NavigationLink` & `NavigationSeparator` (or any other node)

| propName | propType | defaultValue | isRequired | description |
| -        | -        | -            | -          | -           |
| children | node     | -            | -          | -           |


### NavigationLink `<SideMenu.NavigationLink />`

Main navigation item

| propName          | propType | defaultValue         | isRequired | description                                                                        |
| -                 | -        | -                    | -          | -                                                                                  |
| isActive          | bool     | false                | -          | slightly different styling to indicate active link                                 |
| withArrow         | bool     | false                | -          | displays an arrow on hover                                                         |
| badge             | node     | -                    | -          | displays the provided badge next to the link                                       |
| isDiminishedHover | bool     | false                | -          | slightly different styling for hover (e.g. no background transition)               |
| dataHook          | string   | menu-navigation-link | -          | set the data-hook value for the link                                               |
| children          | node     | -                    | -          | -                                                                                  |
| ...rest           | *        | -                    | -          | any other prop will be added to root element (e.g. `onClick`, `onMouseEnter` etc.) |

### NavigationBackLink `<SideMenu.NavigationBackLink />`

Sub menu back link

| propName          | propType | defaultValue | isRequired | description                                                                                             |
| -                 | -        | -            | -          | -                                                                                                       |
| onBackHandler     | func     | noop         | -          | A callback to call when the sub menu back button is clicked                                             |

### NavigationSeparator `<SideMenu.NavigationSeparator />`

Thin line to separate nav items

| propName | propType | defaultValue | isRequired | description |
| -        | -        | -            | -          | -           |
| children | node     | -            | -          | -           |

### NavigationCategory `<SideMenu.NavigationCategory />`

The category of a group of links

| propName          | propType | defaultValue | isRequired | description                                                      |
| -                 | -        | -            | -          | -                                                                |
| title             | string   | -            | true       | the sub menu's title (will appear both in closed & opened modes) |

### NavigationBadge `<SideMenu.NavigationBadge />`

Shows a badge (pimple) next to the link title

### Promotion `<SideMenu.Promotion />`

dump container for promotion button. Tries to stick to the bottom

| propName | propType | defaultValue | isRequired | description |
| -        | -        | -            | -          | -           |
| children | node     | -            | -          | -           |


### Footer `<SideMenu.Footer />`

container for `FooterLink`s (or any other node)

| propName | propType | defaultValue | isRequired | description |
| -        | -        | -            | -          | -           |
| children | node     | -            | -          | -           |


### FooterLink `<SideMenu.FooterLink />`

stylized link

| propName | propType | defaultValue | isRequired | description                                                                          |
| -        | -        | -            | -          | -                                                                                    |
| icon     | node     | -            | -          | block displayed on the left of link. Can (and should) be icon from `wix-style-react` |
| children | node     | -            | -          | -                                                                                    |
| ...rest  | *        | -            | -          | any other prop will be added to root element (e.g. `onClick`, `onMouseEnter` etc.)   |


## Important remarks

* `<SideMenu/>` doesn't care how and where you render it. It takes full
width & height so it's up to you to set parent styling appropriately

* `<SideMenu/>` has no padding or margin. So, if you want e.g. header to not stick
to the top, adjust padding or margin to the children of `<SideMenu.Header/>`

* when height is too little, `<SideMenu/>` add scrollbar to `<SideMenu.Navigation/>`

