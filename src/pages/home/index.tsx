/*
 * @Date         : 2023-11-17 10:51:37
 * @LastEditTime : 2023-11-17 19:11:43
 * @Description  : file content
 * @FilePath     : \headscale-manager\src\pages\users\index.tsx
 */


import { Button, CommandBarButton, CommandBar as _CommandBar, DetailsList as _DetailsList, DetailsListLayoutMode, FocusTrapZone, IColumn, ICommandBarItemProps, Label, mergeStyleSets, SelectionMode, setVirtualParent, Spinner, TooltipHost } from '@fluentui/react'
import { AccountBrowserIcon } from '@fluentui/react-icons-mdl2'
import { Menu } from '@headlessui/react'
import { useEffect } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'
import services from '../../services'
import { Node } from '../../types/node'
import { USER } from '../../types/user'

import LOGO from "../../assets/logo.svg"



const DetailsList = styled(_DetailsList)`

.ms-DetailsHeader{
  padding: 0;
}


`

const CommandBar = styled(_CommandBar)`
.ms-CommandBar{
  padding-left: 10px;
  height: 35px;
}
.ms-Icon{
  font-size: 12px;
}

.ms-Button-textContainer{
  font-size: 12px;
}
`
const _items: ICommandBarItemProps[] = [
  {
    key: 'RefreshItem',
    text: 'Refresh',
    iconProps: { iconName: 'Refresh' },
    split: true,
    ariaLabel: 'Refresh',
    splitButtonAriaLabel: 'Refresh',
  },
  {
    key: 'newItem',
    text: 'New',
    iconProps: { iconName: 'Add' },
    split: true,
    ariaLabel: 'New',
    splitButtonAriaLabel: 'More New options',
    // subMenuProps: {
    //   items: [
    //     { key: 'emailMessage', text: 'Email message', iconProps: { iconName: 'Mail' } },
    //     { key: 'calendarEvent', text: 'Calendar event', iconProps: { iconName: 'Calendar' } },
    //   ],
    // },
  },
  {
    key: 'DeleteItem',
    text: 'Delete',
    iconProps: { iconName: 'Delete' },
    split: true,
    ariaLabel: 'Delete',
    splitButtonAriaLabel: 'Delete',
    disabled: true,
  },

  {
    key: 'SelectItem',
    text: 'Select',
    iconProps: { iconName: 'Select' },
    split: true,
    ariaLabel: 'Select',
    splitButtonAriaLabel: 'Select',
  },
]

const OnlineStatus = (item: Node.v1Node) => {
  return item.online ? <span className="flex gap-1 items-center" > <span className="relative flex h-2 w-2">
  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
</span>Online</span> : <span className="flex gap-1 items-center" > <span className="relative flex h-2 w-2">
  <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-500"></span>
</span>Offline</span>
}



const HomePage = () => {


  return <div className='w-[100px]'>
    <img src={LOGO}/>
  </div>

  
}

export default HomePage