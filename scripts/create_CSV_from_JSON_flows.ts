import * as fs from "fs";
import * as path from "path";
import { json2csv } from "json-2-csv";
//var input_path = path.join(__dirname, "../products/virtual-maths-camp/development/idems-vmc.json");
var input_path = path.join(__dirname, "../products/covid-19-parenting/development/translation/eng/intermediary-files/file_for_translation_plh_master.json");
var json_string = fs.readFileSync(input_path).toString();
var obj = JSON.parse(json_string);


//var columns = ["cat", "sub-cat","name","spec","msg","qr0","qr1","qr2","qr3","qr4","qr5","qr6","qr7","qr8","qr9","flow name","flow id","node id"];


var rows: {cat: string, sub_cat: string, name: string,spec: string, msg: string, qr0: string, qr1: string, qr2: string, qr3: string, qr4: string, qr5: string, qr6: string, qr7: string, qr8: string, qr9: string, flow_name: string,flow_id: string, node_id: string }[] = [];

for (var fl in obj){
    for (var bit_id in obj[fl].localization.eng){
        var bit = obj[fl].localization.eng[bit_id];
        if (bit.hasOwnProperty('text')){
            //var name_split = obj[fl].name.replace("PLH - ", "").split(/[\-]+/).filter(function(i){return i});
            var name_split = obj[fl].name.replace("PLH - ", "").split(" - ").filter(function(i){return i});
            for (var j=name_split.length; j<=4; j++){
                name_split.push("");
            }

            var quick_replies = [];
            
            
            for (var i = 0; i < 10; i++) {
                if (i < bit.quick_replies.length){
                    quick_replies.push(bit.quick_replies[bit.quick_replies.length-1-i]);
                }
                else {
                    quick_replies.push("");
                };
              };
            rows.push({
                cat: name_split[0],
                sub_cat: name_split[1],
                name: name_split[2],
                spec: name_split[3],
                msg: bit.text[0],
                qr0: quick_replies[0],
                qr1: quick_replies[1],
                qr2: quick_replies[2],
                qr3: quick_replies[3],
                qr4: quick_replies[4],
                qr5: quick_replies[5],
                qr6: quick_replies[6],
                qr7: quick_replies[7],
                qr8: quick_replies[8],
                qr9: quick_replies[9],
                flow_name: obj[fl].name,
                flow_id: fl,
                node_id: bit_id,
            });
        };
    };
};

json2csv(rows, (err, csvString) => {
    var output_path = path.join(__dirname, "../products/covid-19-parenting/development/sheet_flows.csv");
    fs.writeFileSync(output_path, csvString);
    console.log("CSV is written");
});

/*

    fs.writeFile(output_path, csvString, function (err, result) {
        if (err) console.log('error', err);
    });
*/


