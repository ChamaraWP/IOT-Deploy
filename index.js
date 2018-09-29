import express from 'express';
import blinkSet from './blinkRecv';



const PORT = 3001;
let app = new express();
app.set('port',PORT);

//app = rasp(app);
app = blinkSet(app);
//app = pirsens(app);

app.listen(app.get('port'),() => {
		console.log(`PI NODE RUNNING ON ${app.get('port')}`);
})