import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as NeoVis from 'neovis.js';


@Component({
  selector: 'app-neo4j',
  templateUrl: './neo4j.component.html',
  styleUrls: ['./neo4j.component.css']
})
export class Neo4jComponent implements OnInit {

  public section = "Neo4j";
  propagation = false;
  formdata;
  advformdata;
  viz;

  propaMin;
  propaMax;
  propaValue;

  min;
  max;
  value;

  constructor() { }

  ngOnInit() {
    this.formdata = new FormGroup({
       EntryName: new FormControl(""),
       Entry: new FormControl(""),
       Keywords: new FormControl(""),
       EC: new FormControl(""),
       GO: new FormControl(""),
       range: new FormControl("")
    });

    this.min = 10;
    this.max = 99;
    this.value = 50;
    this.formdata.get('range').setValue(this.value);

    this.advformdata = new FormGroup({
       propaEntryName: new FormControl(""),
       propaEntry: new FormControl(""),
       propagationParameterBtns: new FormControl(""),
       propaRange: new FormControl("")
    });

    this.advformdata.get('propagationParameterBtns').setValue('EC');

    this.propaMin = 10;
    this.propaMax = 99;
    this.propaValue = 50;
    this.advformdata.get('propaRange').setValue(this.propaValue);

    let config: NeoVis.INeovisConfig = {
			container_id: "viz",
			server_url: "bolt://localhost:7687",
			server_user: "neo4j",
			server_password: "123456",
			labels: {
					Node: {
						caption: "Entry",
						/*"size": "pagerank",*/
						community: "EntryName"
					}
			},
			relationships: {
					"SIMILAR": {
						  thickness: "score",
							caption: "score"
					}
			},
			initial_cypher: "MATCH p=({Entry: 'Q7IZ16'})<-[r1:SIMILAR]->()<-[r2:SIMILAR]->() WHERE r1.score > 0.6 RETURN p"
		}
		this.viz = new NeoVis.default(config);
		this.viz.render();

  }

  togglePropagation() {
    this.propagation = !this.propagation;
  }

  onClickSubmit(data) {
    console.log(data);
    var conditions = [];

    if (data.EntryName) {
      conditions.push("(n.EntryName =~ '(?i)^.*" + data.EntryName + ".*')");
    }

    if (data.Entry) {
      conditions.push("(n.Entry =~ '(?i)^.*" + data.Entry + ".*')");
    }

    var conditionsArray = [];

    if (data.Keywords) {
      conditionsArray.push("('" + data.Keywords + "' in n.Keywords)");
    }

    if (data.EC) {
      conditionsArray.push("('" + data.EC + "' in n.EC)");
    }

    if (data.GO) {
      conditionsArray.push("('" + data.GO + "' in n.GO)");
    }

    var where = conditions.join(" AND ");

    if (conditions.length && conditionsArray.length) {
      where += " AND ";
    }

    where += conditionsArray.join(" AND ");
    var cypher = "MATCH p=(n:Node)<-[r1:SIMILAR]->()<-[r2:SIMILAR]->() WHERE (r1.score > " + data.range/100 + ") AND (r2.score > " + data.range/100 + ")";

    if (where.length) {
      cypher += " AND " + where;
    }

    cypher += " RETURN p";

    console.log("where : "+where);
    console.log("cypher : "+cypher);

    this.viz.renderWithCypher(cypher);
  }

  onClickSubmitPropagation(data) {
    console.log(data);
    var cypher = "MATCH (s:Node)-[r:SIMILAR]->(d:Node) WHERE (r.score > " + data.propaRange/100 + " ) AND (s.EntryName='";
    if (data.propagationParameterBtns == "EC") {
      if (data.propaEntryName) {
        cypher += data.propaEntryName + "') CALL apoc.create.addLabels(d,s.EC) YIELD node RETURN count(d) as count";
        console.log(cypher)
      } else if (data.propaEntry) {
        cypher += data.propaEntry + "') CALL apoc.create.addLabels(d,s.EC) YIELD node RETURN count(d) as count";
        console.log(cypher)
      }
    } else if (data.propagationParameterBtns == "GO") {
      if (data.propaEntryName) {
        cypher += data.propaEntryName + "') CALL apoc.create.addLabels(d,s.GO) YIELD node RETURN count(d) as count";
        console.log(cypher)
      } else if (data.propaEntry) {
        cypher += data.propaEntry + "') CALL apoc.create.addLabels(d,s.GO) YIELD node RETURN count(d) as count";
        console.log(cypher)
      }
    }
  }

  changePropaValue(value) {
    this.propaValue = value;
  }

  changeValue(value) {
    this.value = value;
  }


}
