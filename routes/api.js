module.exports = [
    //Project
    {
        url:        "/project/list",
        controller: "project",
        action:     "list"
    },
    {
        url:        "/project/create",
        controller: "project",
        action:     "create"
    },
    {
        url:        "/project/update",
        controller: "project",
        action:     "update"
    },
    {
        url:        "/project/delete",
        controller: "project",
        action:     "delete"
    },

    //Branch
    {
        url:        "/branch",
        controller: "branch",
        action:     "list"
    },
    {
        url:        "/branch/checkout",
        controller: "branch",
        action:     "checkout"
    },
    {
        url:        "/branch/status",
        controller: "branch",
        action:     "status"
    },
];