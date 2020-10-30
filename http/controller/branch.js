class Branch {

    list(request) {
        let projectDir = db.getData().project[request.id].dir;

        return new Promise((resolve, reject) => {
            exec("cd " + projectDir + " && git branch", (error, result) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    reject(error);
                }

                let send = [];
                const regexIsSelected = /^\*\s.+/gm;
                let branches = result.split("\n");
                branches.forEach(branch => {
                    if (branch === "") {
                        return;
                    }

                    let selected = false;
                    if (regexIsSelected.test(branch)) {
                        selected = true;
                    }

                    send.push({
                        name: branch.replace("*", "").trim(),
                        selected
                    });

                });

                resolve(send);
            });
        });
    }

    checkout(request) {
        let projectDir = db.getData().project[request.id].dir;
        let branchName = request.name;

        return new Promise((resolve, reject) => {
            exec("cd " + projectDir + " && git stash && git checkout " + branchName, (error, result) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    reject(error);
                }

                resolve(true);
            });
        });
    }

    status(request) {
        let projectDir = db.getData().project[request.id].dir;

        return new Promise((resolve, reject) => {
            exec("cd " + projectDir + " && git status", (error, result) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    reject(error);
                }

                const regexBranchName = /^On branch (.*)/gm;
                const regexModified = /^\smodified: (.*)/gm;
                const regexNew = /^\snew file: (.*)/gm;
                const regexDeleted = /^\sdeleted: (.*)/gm;
                const regexBothModified = /^\sboth modified: (.*)/gm;

                let branchName = result.split(regexBranchName)[1];
                let modified = [];
                let newFile = [];
                let deleted = [];
                let bothModified = [];

                const lines = result.split("\n");
                lines.forEach(line => {
                    if (regexModified.test(line)) {
                        modified.push(line.split(regexModified)[1].trim());
                    }

                    if (regexNew.test(line)) {
                        newFile.push(line.split(regexNew)[1].trim());
                    }

                    if (regexDeleted.test(line)) {
                        deleted.push(line.split(regexDeleted)[1].trim());
                    }

                    if (regexBothModified.test(line)) {
                        bothModified.push(line.split(regexBothModified)[1].trim());
                    }
                });

                resolve({
                    branch: {
                        name: branchName,
                        dir: projectDir,
                    },
                    file: {
                        modified: modified,
                        new: newFile,
                        deleted: deleted,
                        both: {
                            modified: bothModified
                        }
                    }
                });
            });
        });
    }

}

module.exports = Branch;