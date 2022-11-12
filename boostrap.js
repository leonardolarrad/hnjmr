
const {exec} = require('child_process');
require('child_process').execSync('hide.exe', {stdio: 'inherit'});

exec('npm run prod', (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stdout);
    console.log(stderr);
});

