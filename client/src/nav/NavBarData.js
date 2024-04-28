import Icon from '@mdi/react';
import { mdiHome } from '@mdi/js';
import { mdiHistory } from '@mdi/js';

export const SideBarData = [
    {
        title: 'Home',
        path: "/",
        icon: <Icon path={mdiHome} size={1} />,
        cname: "nav-text"
    },
    {
        title: 'Transaction History',
        path: "/TranList",
        icon: <Icon path={mdiHistory} size={1} />,
        cname: "nav-text"
    },
]