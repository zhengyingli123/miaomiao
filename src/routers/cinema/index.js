export default {
    path : '/cinema',
    component : () => import('@/views/Cinema'),
    children : [
        {
            path : 'cilist',
            component : () => import('@/components/CiList')
        },
        {
            path : 'brand',
            component : () => import('@/components/Brand')
        },
        {
            path : 'feature',
            component : () => import('@/components/Feature')
        },
        {
            path : '/cinema',
            redirect : '/cinema/cilist'
        }
    ]
}