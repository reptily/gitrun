<template>
    <div>
        <a-button type="primary" @click="modal.visible = true">
            Создать
        </a-button>
        <a-modal
                title="Проект"
                :visible="modal.visible"
                :confirm-loading="modal.confirmLoading"
                @ok="createProject"
                @cancel="closeModal"
                ok-text="Создать"
                cancel-text="Отмена"
        >
            <p>
                <a-input placeholder="Имя" v-model="modal.name"/><br /><br />
                <a-input placeholder="Директори" v-model="modal.dir" /><br /><br />
                <a-input placeholder="Лого" v-model="modal.icon" />
            </p>
        </a-modal>
        <a-list item-layout="horizontal" :data-source="projects">
            <a-list-item slot="renderItem" slot-scope="item, index">
                <a-list-item-meta
                        :description="item.dir"
                >

                    <a slot="title">
                        <router-link :to="'/branch/' + index">{{ item.name }}</router-link>
                    </a>
                    <a-avatar
                            slot="avatar"
                            :src="item.icon"
                    />
                </a-list-item-meta>
                <a-button type="danger" icon="delete" @click="deleteProject(index, item.name)" />
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
    const defaultModal = {
        visible: false,
        confirmLoading: false,
        icon: null,
        name: null,
        dir: null,
    };

    export default {
        data() {
            return {
                projects: [],
                modal: defaultModal
            };
        },
        async mounted() {
            await this.getProject();
        },
        methods: {
            async getProject() {
                this.projects = (await this.$http.post('/project/list')).data;
            },
            async createProject() {
                let postData = {
                    name: this.modal.name,
                    dir: this.modal.dir,
                    icon: this.modal.icon,
                };
                this.projects = (await this.$http.post('/project/create', postData)).data;
                this.modal.visible = false;
            },
            closeModal() {
                this.modal.visible = false;
            },
            deleteProject(id, name) {
                const self = this;
                this.$confirm({
                    title: 'Удаление',
                    content: 'Вы уверены что хотите удалить проект ' + name,
                    okText: 'Да',
                    cancelText: 'Нет',
                    onOk() {
                        console.log();
                        let postData = {
                            id,
                        };
                        self.$http.post('/project/delete', postData).then(responce => {
                            self.projects = responce.data;
                        });
                    },
                    onCancel() {},
                });
            }
        },
    };
</script>