<template>
    <div>
        <a-list bordered :data-source="branch">
            <a-list-item slot="renderItem" slot-scope="item, index">
                <div :class="'branchName ' + (item.selected ? 'checked' : '')">{{ item.name }}</div>
                <div>
                    <a-button @click="checkout(item.name)">Выбрать</a-button>
                    <a-button>Обновить</a-button>
                    <a-button class="green">Загрузить</a-button>
                    <a-button type="danger" icon="delete" v-if="item.selected === false"/>
                </div>
            </a-list-item>
            <div slot="header">
                <b>Ветки</b>
            </div>
        </a-list>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                branch: []
            }
        },
        async mounted() {
            await this.getBranch();
        },
        methods: {
            async getBranch() {
                let postData = {
                    id: this.$route.params.id
                };

                this.branch = (await this.$http.post('/branch', postData)).data
                    .sort((a, b) => a.name > b.name ? 1 : -1)
                    .sort((a, b) => a.selected === true ? -1 : 1);
            },
            async checkout(name) {
                let postData = {
                    id: this.$route.params.id,
                    name: name
                };

                let result = (await this.$http.post('/branch/checkout', postData)).data
                if (result === true) {
                    alert("eeeee");
                } else {
                    alert("bbbbb");
                }
            }
        }
    }
</script>

<style scoped type="scss">
    .checked {
        font-weight: bold;
    }

    .green {
        background: rgb(0, 199, 100);
        color: white;
    }
</style>