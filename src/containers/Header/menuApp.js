export const adminMenu = [
    { //Quản lí người dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.manager-doctor',
                link: '/system/user-manage'
            },

            {
                name: 'menu.admin.manager-admin',
                link: '/system/user-manage'
            },

            {
                name: 'menu.admin.crud',
                link: '/system/user-manage'
            },

            {
                name: 'menu.admin.crud-redux',
                link: '/system/user-manage'
            }
        ]
    },
    { //Quản lí phòng khám
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-Clinic',
                link: '/system/manage-clinic'
            },

        ]
    },
    { //Quản lí chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty',
                link: '/system/manage-specialty'
            },

        ]
    },
    { //Quản lí Cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook',
                link: '/system/manage-handbook'
            },

        ]
    },
];