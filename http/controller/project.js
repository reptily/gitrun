class Project {

    create(request) {
        db.create(
            'project',
            {
                name: request.name,
                dir: request.dir,
                icon: request.icon
            }
        );
        return db.getCollection('project');
    }

    list() {
        return db.getCollection('project');
    }

    delete(request) {
        db.delete(
            'project',
            request.id
        );
        return db.getCollection('project');
    }

    update(request) {
        db.update(
            'project',
            request.id,
            {
                name: request.name,
                dir: request.dir,
                icon: request.icon
            }
        );
        return db.getCollection('project');
    }

}

module.exports = Project;