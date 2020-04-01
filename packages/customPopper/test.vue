<template>
    <div style="padding: 100px">
        <custom-select :option="data" v-model="value">
            <span slot="reference">自定义列</span>
        </custom-select>
    </div>
</template>

<script>
import customSelect from '../groupSelect';
export default {
    components: {customSelect},
    data () {
        return {
            data: [
                {
                    label: '爬取日期',
                    value: 'crawledDate',
                    disabled: true,
                    children: [
                        {
                            label: '爬取日期-1',
                            value: 'crawledDate-1',
                            disabled: true
                        }
                    ]
                },
                {
                    label: '页码',
                    value: 'pageIndex',
                    children: [
                        {
                            label: '页码-1',
                            value: 'pageIndex-1',
                            children: [
                                {
                                    label: '页码-1-1',
                                    value: 'pageIndex-1-1'
                                },
                                {
                                    label: '页码-1-2',
                                    value: 'pageIndex-1-2'
                                },
                                {
                                    label: '页码-1-3',
                                    value: 'pageIndex-1-3'
                                }
                            ]
                        },
                        {
                            label: '页码-2',
                            value: 'pageIndex-2',
                            children: []
                        },
                        {
                            label: '页码-3',
                            value: 'pageIndex-3'
                        }
                    ]
                },
                {
                    label: '数据',
                    value: 'data',
                    children: [
                        {
                            label: '数据-1',
                            value: 'data-1'
                        }
                    ]
                }
            ],
            value: ['pageIndex-1-2']
        };
    }
};
</script>