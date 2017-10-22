# SideMenu DrillView

An N-Level menu drill view component showing a single menu at a time with a slide animation to/from sub menus.
The menus are rendered using the SideMenu design.

## Usage

```html
<SideMenuDrill>
  <SideMenu.Header>
    <h2>My Application</h2>
  </SideMenu.Header>
  <SideMenuDrill.Link><a onClick={doSomething()}>Link #1</a></SideMenuDrill.Link>
  <SideMenuDrill.Link><a href="//wix.com">Link #2</a></SideMenuDrill.Link>
  <SideMenuDrill.SubMenu menuKey="SUB_MENU_1" title="Sub Menu #1">
    <SideMenu.Header>
      <h2>My Internal Application</h2>
    </SideMenu.Header>
    <SideMenuDrill.Navigation>
      <SideMenuDrill.Link><a onClick={doSomething()}>Link #3</a></SideMenuDrill.Link>
      <SideMenuDrill.Link><a href="//wix.com">Link #4</a></SideMenuDrill.Link>
    </SideMenuDrill.Navigation>
  </SideMenuDrill.SubMenu>
  <SideMenuDrill.SubMenu menuKey="SUB_MENU_2" title="Sub Menu #2">
    <SideMenuDrill.Navigation>
      <SideMenuDrill.Link><a onClick={doSomething()}>Link #5</a></SideMenuDrill.Link>
      <SideMenuDrill.Link><a href="//wix.com">Link #6</a></SideMenuDrill.Link>
      <SideMenuDrill.SubMenu menuKey="SUB_MENU_3" title="Sub Menu #3">
        <SideMenuDrill.Navigation>
          <SideMenuDrill.Link><a onClick={doSomething()}>Link #7</a></SideMenuDrill.Link>
          <SideMenuDrill.Link><a href="//wix.com">Link #8</a></SideMenuDrill.Link>
        </SideMenuDrill.Navigation>
      </SideMenuDrill.SubMenu>
    </SideMenuDrill.Navigation>
  </SideMenuDrill.SubMenu>
</SideMenuDrill>
```

The DrillView renders the menu of the `Link` marked with `isActive`, otherwise it will render the root menu.
In order to change the displayed menu you need to change the `isActive` flag of the new active `Link` and the DrillView menu will update accordingly.
Make sure that you only have a single `Link` marked with `isActive` at all times, otherwise the behaviour is unexpected.

You can render as many `SubMenu`s as you wish! Each `SubMenu` can have a `SideMenu.Header`, `SideMenu.Promotion`, `SideMenu.Footer` or any other custom item.
Make sure you wrap the internal `Link`s and `SubMenu`s with a `Navigation` component!


## Props

| propName          | propType | defaultValue | isRequired | description                                                                        |
| -                 | -        | -            | -          | -                                                                                  |
| menuKey           | string   | root         | -          | A unique key for the menu.                                                         |
| inFlex            | bool     | false        | -          | Is in flex container (different styling to handle a Safari bug).                   |
| children          | node     | -            | -          | A list of navigation items of types `SideMenuDrill.Link`, `SideMenuDrill.SubMenu`. |
| stickyFooter      | node     | -            | -          | Render a stickyFooter which will retain it's position even when drilling down.     |

## Components

### Link `<SideMenuDrill.Link/>`

Main navigation item. Make sure you have zero or one Link active at all times.
The children can be any node, but must contain an `anchor` element for the correct style to kick in.

| propName          | propType | defaultValue | isRequired | description                                                                        |
| -                 | -        | -            | -          | -                                                                                  |
| isActive          | bool     | false        | -          | Slightly different styling for hover (e.g. no background transition)               |
| children          | node     | -            | -          | -                                                                                  |
| disabled          | node     | -            | -          | Link will be disabled without effects or pointer events -                                                                                  |
| ...rest           | *        | -            | -          | Any other prop will be added to root element (e.g. `onClick`, `onMouseEnter` etc.) |

### SubMenu `<SideMenuDrill.SubMenu/>`

A container of sub navigation items.
The first `Link` in a `Submenu` must have an `onClick` property (since clicking the submenu passes the click to the first child)

| propName          | propType | defaultValue             | isRequired | description                                                                                             |
| -                 | -        | -                        | -          | -                                                                                                       |
| menuKey           | string   | -                        | true       | A unique key for the menu                                                                               |
| title             | string   | -                        | true       | The sub menu's title                                                                                    |
| isActive          | bool     | false                    | -          | slightly different styling to indicate active link (closed mode only)                                   |
| isOpen            | bool     | false                    | -          | when set to `false` the sub menu will appear like a `Link`, otherwise it will render the sub navigation |
| onSelectHandler   | func     | noop                     | -          | A callback to call when the sub menu anchor is clicked                                                  |
| onBackHandler     | func     | noop                     | -          | A callback to call when the sub menu back button is clicked                                             |
| backLabel         | string   | Back                     | -          | The text that will be displayed on the back link                                                        |
| showCategory      | bool     | true                     | -          | Show a category title in the submenu view                                                               |
| withBadge         | bool     | false                    | -          | Show a badge next to the closed SubMenu link                                                            |
| linkDataHook      | string   | menu-drill-sub-menu-link | -          | Set the data-hook value of the link                                                                     |
| children          | node     | -                        | true       | A list of child nodes including `SideMenu.Navigation` containing more links & sub menus                 |
