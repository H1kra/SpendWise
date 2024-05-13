import Icon from '@mdi/react';
import { mdiHome } from '@mdi/js';
import { mdiHistory } from '@mdi/js';
import { mdiPlusBox } from '@mdi/js';

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
    {
        title: 'Standing Orders',
        path: "/StandingOrders",
        icon: <Icon path={mdiHistory} size={1} />,
        cname: "nav-text"
    },
    {
        title: 'Add Transaction',
        path: "#",
        icon: <Icon path={mdiPlusBox} size={1} />,
        cname: "nav-text",
    },
    {
        title: 'Add Standing Order',
        path: "#",
        icon: <Icon path={mdiPlusBox} size={1} />,
        cname: "nav-text",
    },
]