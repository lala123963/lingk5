/*
东风风行 自行应用商城现下载

export soy_dffx_data='手机号&密码'

23 12 * * *

*/

//要读的变量
const variable = "soy_dffx_data"

const $ = new Env("东风风行")
const author = '作者TG_ID:@ls_soy';
const notify = $.isNode() ? require('./sendNotify.js') : '';
//通知控制,1发送, 0不发送
const get_msg = 0

//延时为区域性取随机,如要2-3秒没随机,开始填2,结束填3,结束要比开始大或相等
//全局延时 开始 单位秒
let ys_s = '2'
//全局延时 结束 单位秒
let ys_e = '3'
//是否并发,并发填 true 不并发填 false
let Concurrency = false

var _0xodA='jsjiami.com.v7';const _0x14b109=_0x39d5;(function(_0x13c51c,_0x31128b,_0x2faf01,_0x365277,_0x2a7cd4,_0x1f3853,_0x3e8ee1){return _0x13c51c=_0x13c51c>>0x7,_0x1f3853='hs',_0x3e8ee1='hs',function(_0xdcdb61,_0x3ca91f,_0x2769c5,_0x5c11c0,_0x101a35){const _0x5894fb=_0x39d5;_0x5c11c0='tfi',_0x1f3853=_0x5c11c0+_0x1f3853,_0x101a35='up',_0x3e8ee1+=_0x101a35,_0x1f3853=_0x2769c5(_0x1f3853),_0x3e8ee1=_0x2769c5(_0x3e8ee1),_0x2769c5=0x0;const _0x652563=_0xdcdb61();while(!![]&&--_0x365277+_0x3ca91f){try{_0x5c11c0=parseInt(_0x5894fb(0x323,'cvLc'))/0x1+-parseInt(_0x5894fb(0x311,'tQ5)'))/0x2*(parseInt(_0x5894fb(0x2f5,'[fPB'))/0x3)+parseInt(_0x5894fb(0x22a,'Qioa'))/0x4+parseInt(_0x5894fb(0x343,'lVCM'))/0x5*(parseInt(_0x5894fb(0x2f9,'aw$^'))/0x6)+-parseInt(_0x5894fb(0x1b4,'[fPB'))/0x7+-parseInt(_0x5894fb(0x2d4,'3Y2@'))/0x8*(-parseInt(_0x5894fb(0x1c3,'#DR0'))/0x9)+-parseInt(_0x5894fb(0x2a5,'@AY2'))/0xa;}catch(_0x3b0056){_0x5c11c0=_0x2769c5;}finally{_0x101a35=_0x652563[_0x1f3853]();if(_0x13c51c<=_0x365277)_0x2769c5?_0x2a7cd4?_0x5c11c0=_0x101a35:_0x2a7cd4=_0x101a35:_0x2769c5=_0x101a35;else{if(_0x2769c5==_0x2a7cd4['replace'](/[pHflTOUIAyKDnxXwbB=]/g,'')){if(_0x5c11c0===_0x3ca91f){_0x652563['un'+_0x1f3853](_0x101a35);break;}_0x652563[_0x3e8ee1](_0x101a35);}}}}}(_0x2faf01,_0x31128b,function(_0x4fda5a,_0x2905df,_0x1b283f,_0xa6b21d,_0x196e5a,_0x404e26,_0x169766){return _0x2905df='\x73\x70\x6c\x69\x74',_0x4fda5a=arguments[0x0],_0x4fda5a=_0x4fda5a[_0x2905df](''),_0x1b283f='\x72\x65\x76\x65\x72\x73\x65',_0x4fda5a=_0x4fda5a[_0x1b283f]('\x76'),_0xa6b21d='\x6a\x6f\x69\x6e',(0x14d6f0,_0x4fda5a[_0xa6b21d](''));});}(0x6680,0x2b2df,_0x4cc3,0xcf),_0x4cc3)&&(_0xodA=0xcf);try{CryptoJs=$[_0x14b109(0x27f,'WbW&')]()?require(_0x14b109(0x1ee,'Qioa')):'';}catch(_0x41a7e0){throw new Error(_0x14b109(0x20d,'^$bw'));}function _0x39d5(_0x36cb9a,_0x997394){const _0x4cc3bd=_0x4cc3();return _0x39d5=function(_0x39d524,_0x188f53){_0x39d524=_0x39d524-0x1ae;let _0x46ae83=_0x4cc3bd[_0x39d524];if(_0x39d5['eqDPZj']===undefined){var _0x273f40=function(_0x1724ab){const _0x33d1d3='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x39e8ea='',_0x5039cb='';for(let _0x41c60a=0x0,_0x358eea,_0x30c0d6,_0x2001ff=0x0;_0x30c0d6=_0x1724ab['charAt'](_0x2001ff++);~_0x30c0d6&&(_0x358eea=_0x41c60a%0x4?_0x358eea*0x40+_0x30c0d6:_0x30c0d6,_0x41c60a++%0x4)?_0x39e8ea+=String['fromCharCode'](0xff&_0x358eea>>(-0x2*_0x41c60a&0x6)):0x0){_0x30c0d6=_0x33d1d3['indexOf'](_0x30c0d6);}for(let _0x46b25e=0x0,_0x34f3e9=_0x39e8ea['length'];_0x46b25e<_0x34f3e9;_0x46b25e++){_0x5039cb+='%'+('00'+_0x39e8ea['charCodeAt'](_0x46b25e)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x5039cb);};const _0x2b5470=function(_0x1016bf,_0x41d71e){let _0x1e19fc=[],_0x4488c4=0x0,_0x5691b7,_0x143d61='';_0x1016bf=_0x273f40(_0x1016bf);let _0x5ede2d;for(_0x5ede2d=0x0;_0x5ede2d<0x100;_0x5ede2d++){_0x1e19fc[_0x5ede2d]=_0x5ede2d;}for(_0x5ede2d=0x0;_0x5ede2d<0x100;_0x5ede2d++){_0x4488c4=(_0x4488c4+_0x1e19fc[_0x5ede2d]+_0x41d71e['charCodeAt'](_0x5ede2d%_0x41d71e['length']))%0x100,_0x5691b7=_0x1e19fc[_0x5ede2d],_0x1e19fc[_0x5ede2d]=_0x1e19fc[_0x4488c4],_0x1e19fc[_0x4488c4]=_0x5691b7;}_0x5ede2d=0x0,_0x4488c4=0x0;for(let _0x204913=0x0;_0x204913<_0x1016bf['length'];_0x204913++){_0x5ede2d=(_0x5ede2d+0x1)%0x100,_0x4488c4=(_0x4488c4+_0x1e19fc[_0x5ede2d])%0x100,_0x5691b7=_0x1e19fc[_0x5ede2d],_0x1e19fc[_0x5ede2d]=_0x1e19fc[_0x4488c4],_0x1e19fc[_0x4488c4]=_0x5691b7,_0x143d61+=String['fromCharCode'](_0x1016bf['charCodeAt'](_0x204913)^_0x1e19fc[(_0x1e19fc[_0x5ede2d]+_0x1e19fc[_0x4488c4])%0x100]);}return _0x143d61;};_0x39d5['kEebYB']=_0x2b5470,_0x36cb9a=arguments,_0x39d5['eqDPZj']=!![];}const _0x1e2b05=_0x4cc3bd[0x0],_0x47d475=_0x39d524+_0x1e2b05,_0x2dd209=_0x36cb9a[_0x47d475];return!_0x2dd209?(_0x39d5['pUZWuw']===undefined&&(_0x39d5['pUZWuw']=!![]),_0x46ae83=_0x39d5['kEebYB'](_0x46ae83,_0x188f53),_0x36cb9a[_0x47d475]=_0x46ae83):_0x46ae83=_0x2dd209,_0x46ae83;},_0x39d5(_0x36cb9a,_0x997394);}try{crypto=$[_0x14b109(0x330,'t737')]()?require(_0x14b109(0x2d8,'3Y2@')):'';}catch(_0x4f5725){throw new Error(_0x14b109(0x1c9,'t]nf'));}function _0x4cc3(){const _0x56a126=(function(){return[_0xodA,'pjnHsxjUBifKayXmBAiT.OyIcKbolmITK.DyvIw7==','sH1VW4VdIG','wSowWQO','it3dOmogWRpcRCoOW61TW4ddLwJcLIKeWO8gW7q','WQaHWPKJoW','gYW0bvVdSaXq','W6RdS8k9wuK','WPa2W40','aSomjSosWOddISkeEa','6lAh5yYTW4W','y1a4WPv0','D21HW6BcKqaajG','kINdSmoMW7hcOSoSW7u','uCoCWRNcTKTBW6RcMW','gGCRyX1H','gCotzKtdLxe','rCoch3xdLG','DIVcLmkb','WODHW4BdI8oVW57dUCkI','W4/dOSkSv0qwWRNdMMHl','W6HRWPlcUCkx','kJdcILyGW7JdJq','WPhdNmkezKRdSmo6WQ8','W4VdKCo5W60jWODUW6TKW5ZcLG','W703W6KuAuK/','B8o9u8kjBW','C8owWPysWPy','qCompNldGr5nkq','CxHLW4lcLXytitVdMCkNjerUW7lcMSkUWQfVwwiiWPFcMCk7E8kup8onwW','W4/dOSkSuKinWR7dNq','jaqnivG','uIHSW5tdQSkyrmk2','W6tLTRBNROJLIzS','6lEX5y+eza','W7PqbrFcR8kA','emolqfDm','WPP6FbBcRCkvkmkCW7xdJ3BdQSokW7jIfSojWQfPshC7WOrmWPmPWRBcIt3dNYhdHq','FdHHW5FdKG','WRygdemg','WP7cKCk2yKJdJ8oXWRPcw8oGxSkjW4WVtGRdQSk0WOdcOxjPWRnnDvX2sCoSW7OKgNralCoMWPHpWQ3dVa5jtmoWW4iEWR3cHbNcUmoDBCksW68NW43dGs5AgSkVW6VcGetcJCkrmhVcQ8oyFxHRsSkEW7udpvlcMCkCw8k0srtcGSokWPlcOq3dQghcGmkKma','CspcR8kleG','rgjIx8ou','W5xcTCk/WQq7WPRdVIO','xcL9W6NdU8ksx8kHD8kx','W55NWPpdG0tcNSkbWPO','DG/cK8kjn8ozhCkv','WPf8W4vjW7C2p1/dP8oc','WOXRW5u','fmkvW6/cKevAW7hcH8o7jN/cN0ldLCorWOC','6lEZ5y6QuG','W4m8WOKpW5qs','WOz7mvBdRSodjmonWRpcHhBdU8kmWR52rSkbWR5/aYP/W48rWOK+WRFcMdFcIghcIXNdKSklW7NdNCoZDCkQW7NcTSkyWRRcN8k+nf8HWOXOt8oYt8ooW6mAW6v5','hqJcIv0l','W4BcR8kgWOKU','n8olCN9m','W4nqltRcI8oVDSkDjx4','qMOxWPPAWPmAWP/dPG','rCkZWPZcQ8kNEXhcGG','qxLyW7/cRa','gXyPBGy','hwb3W5fr','fwBcP20','a8kgdmoYdW','6lA/5y6hWQG','WRabhfiN','W6nsW4ZdQ0m','W5CYzu7dQa','fLZcG09t','zmk9WOFcLmk8','vMyeWRL6WPmRWORdUMu','WPnOW4xdSSor','uCoeWOWxWQq','e0BcJeKT','W7atW63cJ8kbW5BdNWJdMvXdW4ldNXVcMq1QWQBcPmkPW53dMtuoWQLMdIikBSkXWRJdGmkYBmkQWPVcImofW6j3W6SQEthcRSkYWRlcQq','daapzCoNuCklhq','wCoga2hdHX8','W4yDDsJdGa','rmobWR8HWRS','W4DIWPe','ihFdISkhi8o0mmkzFq','rmotWRibWRe','h3jCW7v8WRerCwu','qf9NW4dcHa','W6yfDSokCSkMqe7cHG','dmoPxW','qmoFWPFcQ1q','W5T9nxRdVSonpCoj','gbRcO24e','moIoV+wpG+wTQoMrM0/OVQBLMOTY','jxRcSezUhNVdSefXhha','p8oon8oxWQa','bbHTbmoZwmoxWQKHFq','W5KqqXddNuVcNSkgcq','aWHXlSkX','W4BcV8kyWOqGWP7dTq','W7FdVurmtq','WONcRSklWPXt','lXJcILm+W7VdNCoh','whj2tSol','Dg1JW4FcNra7mq','W6GEWQOgW4m','WPPvb8o+yq','rgD4','WQ9HWRnwFMOQWO4+WOG','a+EUSUwjUmkf','rSoHgb7cVJlcSKm','BSojW5CyWOpcJ8k4WP0','iJeSWPBcHGqgechdUW','ow0G','qCkTo8oAava','W4KfW6RdJSkjW4ddOaxcJq','W55/WPO','W5HOWOldLCkJWPKfgYex','W6lcK8k7WRGK','ofhcS3SY','dxxcSf9v','WORNMilLVBfe','W5SNqW','z8ogixFdQq','W51gja','W6VdGvjmFq','WR7cUmkBWQLW','a+InU+woNUwTUEMsKL4','ahnc','ySoxWRNcRgW','FeW6qmoPkSoXWRuWCSkKWQa','cmoCpq','WQK5jSk7ddvwWPHtW7m','gUAjTUs4MowkNUs9O+I0O1i0kSoFWQz4dJhORAROHj7OO5NLRyVOO4iY','b2SHoetdIb1kWR3cHmoTnSkYtrD+tYXRWRJcMhjKW61PcmoVW5dcJdVcIg7dS2tcImk5WP3cSfanW6ZcVhTNdCkeuCkpW5tdRd7dNCkQiN4VWRDfo3X2oCo8WRJdT8ovnSkwW4RdISoUvSodzCkIW7W5kCkEW5CvWPWhvZitWRz/v0JcV8kLW7BdUYWx','W4uKseVdNG','dZehAXu','yCoEqCkDtG','Esni','zsjQW77dUve','hSopbuJdKhFcJNG','vMyeWQT2WPm9WOZdPMyEf0q'].concat((function(){return['W5iXuKVdICk7WPNcUa','WPpcMSkbWRDAWQS','deZcNvH3','kMVcSgzOrJJcTK5lhwtcJmkEq8keWQZcPSkPWOz9BbWSWRddQa','FLX3sCoM','WQfaW4FdSbFcK8k4WQXdWPO','WRZMIkRKUkNLIjlKVlFOTOJdSmk6pSo7k+IVR+IeJ+IHQUwUUEIGNCk1','W4CRWOqSW4uEoNldImot','W7WPWRlcKg4','swn5W57cLG','lZxdRCoMW5K','6lAo5y2WW7G','pXX6b8k7','aSoDe8oFWQC','B3BdJ2tcKSk9WQK','6lwa5y2ECa','WRy5gG','W55ulJS','WRyLhW','WPnHW4BcRSoJW4tdPmk6WQSx','fCoUW5hdLSkMrGtcPSoTW7a','uCoCWRNcRufnW7FcHSoXDW','pXj7aa','WOasadvG','qwWdWOa','cmoYtevLWQxdVvFcHCkTW6ldLmoHnLNdVCoDwbq6W57cNmk8WQpcOXW','6lEC5yYEW68','W7q2W60','WPadWRGtfW','WP3cJmk7WOXxWQni','W43cTCkl','WRJNRiBLI4tdUW','jhNdJSovC8kdr8kZumoBWRpdKCkx','W7BcRSk/WRWr','aCoOcSobWQ4','qZz0W7NdUa','W5PsW5JdKwi','W4xdQmk6','Ed53W6xdR13cQZe','hgvlW6HPWQSmBW','W70+WPpcKMW','W4iEWRVcHua','W6FcOSkEWRO5','WQbegupJGOtLHztdUG','wvv9pKa/DtNcP17cGCk6W4G','WRhcJmkQWQGtWO9bW4rzW5i','6lsM5y2rW5O','WPNcV8oUlXOXWO/dQeztW5y','WRPaiW','cqxdOSoDW7a','rCkZWPZcISkNCGRcHa','W6VdP3zAta','vSk5WOpcG8kM','WPlMIBxKUj7LIR3KV4BOTkGCWRHQW6HtomoAW4tdLEIUHoIePEIJG+wUG+IGPSoy','wMjBW7vPWQ0vC3LLW7i5WQtdOrVdTmkmWOxdOmoqWQWyAHVdHSo8F8orwmovsSoEwSkFW5lcS8kbW4qMbmo3zmoPW5NcTCk1W7eIxmobqmo/','WOhNMQhLVRNdQUI+NEwyRCkW','W5eXugBdI8kQWRu','s8kLWQBcICkSCa','jsRcQLGOW7e','W63dVe0','W5XAja','W7BdTNnxxW','w8kPhCo7qa','W60FW6pdH8ko','z8omkhpdR2u','WRnmW7pcSCk1WP0','WRGegMWk','yUETOEwlTcW','e2tcPZaNW6m/wWhdT8oCWRbvWOJcMSkOrCoyxSkfW6JdIMjLAh3cPapdHcaaWQNdLNiPW6pdMSkeE8klimkPW7KYW7NdMIdcOr8','iSoqsvnI','WOFdNmkZAW','W4ZdUurkta','umoPWQKV','wmomdW','gYW0afVdQWPl','lNRcQNfVfa','amkRiCkj','W4BcV8kyWP0GWP3dPtNdOx4','dIuPd1K','W4v9kKldRSoe','WPVcHCkJ','WPjLW5ZdP8oVW4y','gmoRBwddUG','s8k4pmoprf7dImk1WQNdOCkrnmkzfSoNWOaBWRdcKfysw1SLWP4c','fmoPu1b4','uoImL+wpVUwVREMqLc7OVllLM4nl','wCoRcW','W5j9W5FdOcVdOSoTiSoRvW','WPlcUmouW6n+W4RdSxNcSgNcRCodtghcRXfuzGZdVwVcHXFcJCkshfGxW5/dTvqT','W741W6ujyG','hvOnW44DvvLEtW','WRTwkSoUDSkS','rCowd2RdMHrOk3C','eKCt','W7FNMyJLVjhcSW','W7n5WQ/cUSkr','WPX/c8oGDG','W7LMx0OlW50SxtFcKeu','W6ful2VdJW','yt5g','6lEU5y6ZW5y','yM1/sCkTcCoCBSoLEG','W5i7sKC','frWgjwi','qCo2bq','tttcUCk4eW','WPddGCk7','WOJdNmk1','W75FW7pdQKm','gu0aW6OavXe','WPCOcvKf','WQWEWOajeW','CIVcICk5lmoBeq','cqSn','edaPcmk1E8kcmSkMkW','W7qEWRqRW4q','gmkSia','eSoptfi','n23cQa','d8oknCkwWOldMSk5Df1nbSoBW63dHCobiKddJmo4W57dSmkPBSoDoCkQlMmXpGxcSCktW6pdR8k3wCoCpmoAW59tq8k3xSkdWPFcN8kS','uSogguVdNbLxjG','EUAlNUs4PEwiM+s8RoI1GSogFHNdPhCyimobxbqcWOJORRhOHQZOOk/LR6ROOPTO','W4v3iW','W7xOJ6RLJQtLRQhPKOrF','W7FLTRJNRipLIiO','WQFdNSkXD1u','W7XUzCoKobT1WR8','tYnfW5xdVCkqxmkQqmkqfCoEWRxcIG','q1BdONZcR8kAWPb5qmkP','zmkjha','kr8hscO','W5q7qfS','jGa8ytm','bY4graO','zvqvWQfk','asPfpSk4','CY3dTYiUsIdcOrS','dmo3xfG7W77cOGJdH8k4W6ddLCk2oGFdRSkCuq'].concat((function(){return['C0fpW6lcUq','ggjeW7bi','fSkTpSoblgS','EaVcL8kfaa','C8oVWP44WQm','fSo/qfzz','oG9K','xcL9W77dV8kfvq','WR9wjCoTz8k2uG','tSkJkG','W5DqnW7cSmoIBSkDieZcJWm','WPfIpSo7wa','tXTmWODBcujSu8kblSozka','cUAlMos7T+wjI+s9V+I2USoWWRFcIJ/cMEIVJUIeM+IILEwUNoIITCoV','v8o+obFcIW','cWKHyG','BCovWP0','W7rbkqJcRq','WQWLWOik','gmofsu/dLgBcLq','WQq1WPigBf7cJmktWR7dIZ7cUSkHmSk1WQ92WQW','dCoPwG','WOWvWQiAdW','bLDiW7vR','kJNdRSoYW7K','lJBcGe4','W58/sX3dOq','W4jAWQhcTCkp','WPi1W4xdICo1W4vyrx1g','kb4Lhw0','wUETUEwlSIFOVPlLMyHR','W7SyW6qcyLyIWQy','W6PUySospX9iWRO','b8k6nSoUpgxcQvW','WPFcISkLWQ5R','r8o0bsJcRG','gJaiDaS','iKRcJ3qQ','6lE95y69xq','WRKYfq','WPFcHSkT','W5LgdthcOCoL','r8kPpSowvahcRSo+','W7eeW7ZdKSktWPNcHe/cMeXxW5/cMr/cKfH3WOpdU8o9WPtcHs5EW7q+','iSkRfmoDaa','g+ESSUwiUCka','W64sW7NdLmkX','xwyEWPnNWPu','W517W5K','WRiCkb1S','ENT6W4a','aComjmo/WOldM8kO','WQG6evmx','e25CW4n8WQeq','eSogo8oEWO0','vabSW5pdUq','nmofF2XE','W4mkAHhdSea','fCo0va','BGTfW4pdHq','CmonWPKiW5RdGCkGWO3cU3pdNfRdNmkPCb0','c8ogmG','W78DWOdcKKFdG8oLW7CsW50','WRblbCoVCa','D8oxcexdLW','W7uxWPy','rCkZWPZcOmk9EqNcS8oPW6qY','W4CJqvddNSkNWQxcTslcQ2zRWOfav8kWW5xdOmoVWPxdMCofW69LWPucbLWSbmk1WO3dSSk2','bruI','nwKxWQdcQaFdT2mWga','pW7dQmoVW44','q8oClWZcGG','e0Cw','W5HlWRFcJ8kW','rSkZWP7cJ8kRCcZcJG','k3hcOhnJm3e','W7WzWOdcOa','W6fqldJcOG','nsS5xW','WQhJGj3cTSkuWRpcQrKFmEIfQoACQUAxM+s4VUwhU+I3PEwJPoAzHEocOU+8ONdJG4BMRQBOHjRMNjJMLOVKUztKUQBNL7xKUixMT4JORltLKQFLR6RKUABVV77KV4JNL7hMTlBOR6tOH7tMNQNOO7NKUixLNyRMNjhLSytLJRtPO57PMRxJGPtKU6NOG5BKV7dORzdLHj7LK4pMSBVMG6dJGiVLHQ/NOklMGk/JGllLRP3ML5VMGyNLKjpMNjtMLPNMGjhVVyJKVkNOGlVMN6JKU4JLRyNKUkJKVy7OH7ZMN53PLA7POyxMPjVKUB7OTltOTiBVVAxLJj7MIAlKV4dKUiRPMO/KUjlNL5dKUA3KVQ/OHl3MNR3PL7/ORRFLR6lOHARNM5VKU53KVjxMJPRLPRlMIO7MJyJLRQ3JGBZJGi1644cY5P+M6iwo5P6h5Pwj5lMy5lMx5l6Q5lUq5OIk57+25l+e5lQT5B6G55AJ5lM65zwy5lMr5OMG6z665Rg/55QZ6koI5lM577YT55wQ6iE16kwJ5A2/562B77+j5zkY5yIU5zcd5P2V6iwE6lEE44oFW5NdISoDfoITVoIVI+E8QU+9QCkuW6BdTCowuxyoWOStWQlcOmolWRvAlLf2WOHKWR4bW5pcV8ocW7pdTCkWkdlcGG','bCoOpSoFWPhdGmkKEa','WPBcHSkO','jSkagmomf8o5WQCbjCkwzYK','u1KrWQzl','W5Ksq2pdNa','qCk3WPZcHCkG','wx1Puq','smocWRGXWPG','ESorWRqXWQC','WRFcRCo6','ihdcOg8','dvGyW5CD','xYbpW7NdTG','W7vKCq','x8oungpdSG','hqVcPqddS8ohW5C4emoU','6lwd5y6tsG','xCo3jY7cVJy','DCouWPy','FYDHW6VdLW','zCktWRW','qMOxWPPAWPm','6lwP5y6kka','WRz9l8oBEG','W4aTxehdPq','W6ZdUvf7rW','W7O2W64F','WOPegum','W4fSmfxdQCkwzSkhWQ3dMNpdPSorW7jWx8oFW7DShdvGW44xWP4N','WOzuW5FdUSoz','W7SDWP3cRq','WOnQWOBcKXldHmkiW4VdQsXrWOqEW7KRWP84W67cMmo1WPFcPCkbDaTOlCk/iJ3cGsm','CmoWaXFcSG','WR/MNllMI53LIOmnW4O','hCklimoAWPddNmk6CWjivmkrWQq','vXNcSSkonq','W4/dOSkStKqvWQK','iaS+CCoM','WQdMIiFKUkNLIy7KViNOTBpdUSknaZpdV8kyiSo6p8kVoCk76k++6isp6kca5AYB6kkGbW','W5LDumojpW','WQZcImk7WOjj','WQ44eq','W488WRlcRK8','eSoghmouWPtdISk/xXfFeW','hKylE8oJBSkAfIj6CCo0WQZcS8kgibSbW4dcKSoFBI/dSdZdLCoDW7FdHKjTjCohWRxdO2nTWPxcPmonWPK6uSoJWR90WRxcRmk6h8kYbfH3ySoDjahdQ8ouhSopvbBcQ8oxomksWR5mWPu0W4OCWOpdLINcJCoXomkMWOXIW4ZcHmoiotjXWQhcT8kzxxv1W7O','yMldRepcNa','a8oisrO','W7HPWRRcGSkx','lmo3qvbE','W6ldMePQBq','keqUW5qZ','W7CtWPZcTvBdKmkLWQPyWP/cJ8okWOJcNYRdTmoDW6jZa24bbtnBpI3cK3ZcHKRdRmoCWPiHpmk4W6VcVSodrCkaW7JdHmkEdHytpCkVlfpcRtPTWQDzWOJcStVdVCoDWPzzFSkWWRm3WR5wrmoCtCkwjt55W5/cJmoeua','cSognW','WOqQWPdcH3VcT8k1Dmk2','WPnnWRxcN8oa6iA55P6h5OIh6kk4hr7cKUwoO+s7KUAuLUMxNo+9GW','WOvKebhcMSoOW6dcNGtcOuHkWR8','v8kJbmoqqahcLCozWQtdO8kq'];}()));}()));}());_0x4cc3=function(){return _0x56a126;};return _0x4cc3();};try{axios=$['isNode']()?require('axios'):'';}catch(_0x43e935){throw new Error(_0x14b109(0x326,'tQ5)'));}try{fs=$[_0x14b109(0x2b5,'^$bw')]()?require('fs'):'';}catch(_0x5e9382){throw new Error(_0x14b109(0x335,'@AY2'));}try{os=$[_0x14b109(0x247,'(ips')]()?require('os'):'';}catch(_0x3b793a){throw new Error(_0x14b109(0x22b,'q3zY'));}try{NodeRSA=$[_0x14b109(0x32c,'9w4$')]()?require('node-rsa'):'';}catch(_0x5d3317){throw new Error('\x0a找不到依赖\x20node-rsa\x20,请自行安装\x0a');}try{KEYUTIL=$['isNode']()?require('jsrsasign')['KEYUTIL']:'',KJUR=$[_0x14b109(0x1ce,'J45R')]()?require(_0x14b109(0x2f7,'R1bO'))[_0x14b109(0x33d,'75u*')]:'';}catch(_0x5e1db8){throw new Error(_0x14b109(0x294,'bUc6'));}subTitle='';async function main(_0x3a962f){const _0x48cdff=_0x14b109;await _0x3a962f[_0x48cdff(0x2ff,'O@48')]();}class UserInfo{constructor(_0x49cb01,_0x22a3f2){const _0x312033=_0x14b109,_0x2e7a51={'DIfvn':function(_0x41c780,_0x35aa1c){return _0x41c780+_0x35aa1c;},'NSYNl':function(_0x2aa4d1,_0x5f1b07){return _0x2aa4d1+_0x5f1b07;},'siWUI':function(_0x5bd3b4,_0x37a3a8){return _0x5bd3b4+_0x37a3a8;},'byiMG':_0x312033(0x2ad,'YCoB'),'XGNxV':function(_0x2b8939,_0x44ef17){return _0x2b8939!==_0x44ef17;},'dQFQL':_0x312033(0x29e,'XkIs'),'HtabC':_0x312033(0x1f4,'aw$^')};try{const _0x28f132='2|4|0|3|1'[_0x312033(0x2e1,'L(YQ')]('|');let _0x2f1b7f=0x0;while(!![]){switch(_0x28f132[_0x2f1b7f++]){case'0':this[_0x312033(0x1ea,'WbW&')]=_0x22a3f2[_0x312033(0x279,'Qioa')]('&')[0x0];continue;case'1':this[_0x312033(0x248,'63No')]=_0x2e7a51[_0x312033(0x1c5,'4SN)')](_0x2e7a51[_0x312033(0x331,'O@48')](CryptoJs[_0x312033(0x277,'t737')](this['mob'])[_0x312033(0x2bc,'[&%R')](),'@'),new Date()[_0x312033(0x201,'Qioa')]());continue;case'2':this[_0x312033(0x324,'5Wg!')]=_0x2e7a51[_0x312033(0x1c7,'Miot')](_0x49cb01,0x1);continue;case'3':this['paw']=_0x22a3f2[_0x312033(0x241,'WbW&')]('&')[0x1];continue;case'4':this[_0x312033(0x32a,'OZ!S')]=_0x2e7a51[_0x312033(0x339,'4SN)')];continue;}break;}}catch(_0x714520){_0x2e7a51[_0x312033(0x1b0,'l2GW')](_0x2e7a51[_0x312033(0x337,'^E%g')],_0x2e7a51['HtabC'])?console[_0x312033(0x2fa,'XkIs')](_0x714520):(_0x2ddeda[_0x312033(0x2d5,'r4aZ')](_0x312033(0x2e5,'GH&q')+this[_0x312033(0x1ff,'[&%R')]+_0x312033(0x31a,'bUc6')+_0x4f02c3[_0x312033(0x22e,'q3zY')]),_0x4af653+=_0x312033(0x1f8,'l2GW')+this[_0x312033(0x233,'XkIs')]+'\x20登录:'+_0x522b73[_0x312033(0x24e,'mCnE')]);}}async[_0x14b109(0x228,'(ips')](){const _0x2eea8e=_0x14b109,_0x4813db={'eFgSN':'\x0a找不到依赖\x20crypto\x20,请自行安装\x0a','YgglC':function(_0x42470b){return _0x42470b();},'HBLBj':function(_0x21677c,_0x28ff7f){return _0x21677c(_0x28ff7f);},'rBlDP':'okhttp/3.14.9\x20(Android\x2014;\x20\x20\x20Build/V14.0.4.0.UMCCNXM\x203.2.6\x2040059\x20release\x20dflqApp)','ReLqZ':'identity','sOsCx':_0x2eea8e(0x2ce,'[fPB'),'wXFMX':_0x2eea8e(0x2f8,'tQ5)'),'OgPhe':function(_0x3a94cb,_0x7c54b){return _0x3a94cb!==_0x7c54b;},'anMIy':'kSduS','WDFom':_0x2eea8e(0x303,'cvLc'),'zrZPF':function(_0x495e83,_0x354b15,_0x3dc704){return _0x495e83(_0x354b15,_0x3dc704);}};await _0x4813db['zrZPF'](Sleep_time,ys_s,ys_e),this[_0x2eea8e(0x315,'YCoB')]=_0x2eea8e(0x1ca,'R1bO'),this[_0x2eea8e(0x209,'^$bw')]='';let _0x598228=this[_0x2eea8e(0x30f,'WbW&')](0x1);return new Promise(_0x3a1ece=>{const _0x320703=_0x2eea8e,_0x281c5b={'zVkeh':function(_0x441932){const _0x426156=_0x39d5;return _0x4813db[_0x426156(0x300,'5Wg!')](_0x441932);},'qrwCn':function(_0x375c7d,_0x2aea49){return _0x375c7d==_0x2aea49;},'hbDld':function(_0x3e04ea,_0x4457c4){return _0x4813db['HBLBj'](_0x3e04ea,_0x4457c4);},'QQmjG':_0x4813db[_0x320703(0x264,'4SN)')],'iWWMO':_0x320703(0x1f9,'vfkX'),'sVfsv':_0x4813db[_0x320703(0x31c,'01]q')],'cIZLG':function(_0x8cb137,_0x1ff41c){return _0x8cb137==_0x1ff41c;},'KiKGw':_0x4813db[_0x320703(0x31e,'Miot')],'dtCdD':_0x4813db[_0x320703(0x265,'WbW&')],'iANTk':function(_0x451ff2,_0x3f5a95){const _0xc898b4=_0x320703;return _0x4813db[_0xc898b4(0x1b7,'9w4$')](_0x451ff2,_0x3f5a95);},'gujYg':_0x320703(0x25d,'aw$^')};if(_0x4813db['anMIy']===_0x4813db[_0x320703(0x298,'^E%g')])throw new _0x5691b7(_0x4813db[_0x320703(0x1bc,'^E%g')]);else $[_0x320703(0x347,'VQg^')](_0x598228,async(_0x5aca46,_0x57627b,_0x1a2194)=>{const _0x2e4762=_0x320703,_0x5de755={'FLKZW':function(_0x4460ff,_0x5e8578){return _0x281c5b['qrwCn'](_0x4460ff,_0x5e8578);},'DNCrc':function(_0x125bef,_0x189982){return _0x281c5b['hbDld'](_0x125bef,_0x189982);},'gWBlg':_0x281c5b[_0x2e4762(0x2da,'J45R')],'sFAwp':_0x2e4762(0x307,'J45R'),'xeUDw':'application/json;charset=UTF-8','HPZyc':_0x281c5b[_0x2e4762(0x239,'YCoB')],'ldQVT':_0x281c5b[_0x2e4762(0x235,'R1bO')],'Qeofg':_0x2e4762(0x2d2,'mCnE'),'wmZTg':_0x2e4762(0x23a,'YCoB'),'NfyfA':'lqdm-app.dflzm.com','Yklph':function(_0xda3f03,_0x26c323){return _0x281c5b['cIZLG'](_0xda3f03,_0x26c323);}};try{if('TLlmU'===_0x2e4762(0x2bf,'OZ!S')){let _0x4c6be3=new _0x5938b5()[_0x2e4762(0x204,'[fPB')]();if(_0x5de755[_0x2e4762(0x2a7,'9w4$')](_0x2b369d,0x1)){let _0x96aa7=_0x397a08[_0x2e4762(0x1d4,'WbW&')](_0x2e4762(0x1dc,'q3zY')+_0x5de755['DNCrc'](_0x4b63e7,this[_0x2e4762(0x258,'XkIs')])+'ice-auth-appkey%3A9831532554ice-auth-timestamp%3A'+_0x4c6be3+_0x2e4762(0x250,'tQ5)')+_0xe6f65(this[_0x2e4762(0x217,'@AY2')])+'3b8379a44daa6ab982c886d8bcdcc82a')['toString'](),_0x5a04ec=this[_0x2e4762(0x288,'H)88')];return{'url':_0x2e4762(0x348,'XkIs')+this[_0x2e4762(0x20a,'O@48')],'headers':{'User-Agent':_0x5de755[_0x2e4762(0x329,'L(YQ')],'appInfo':'{\x22appVersion\x22:\x223.2.6\x22,\x22osVersion\x22:\x22Android\x2014\x22,\x22appType\x22:\x22Android\x22,\x22deviceName\x22:\x22\x20\x22,\x22deviceId\x22:\x22'+this[_0x2e4762(0x212,'t]nf')]+'\x22}','platform':'2','device':_0x5de755[_0x2e4762(0x267,'YCoB')],'deviceSN':this[_0x2e4762(0x32f,'@AY2')],'Accept-Encoding':_0x2e4762(0x2c5,'kW^%'),'Cookie':this[_0x2e4762(0x1d3,'GH&q')],'Cache-Control':'no-cache','appKey':'9831532554','ice-auth-appkey':_0x2e4762(0x206,'vfkX'),'ice-auth-timestamp':_0x4c6be3,'ice-auth-sign':_0x96aa7,'Content-Type':_0x5de755[_0x2e4762(0x1d2,'63No')],'Content-Length':_0x5a04ec['length'],'Host':_0x2e4762(0x232,'l2GW'),'Connection':_0x5de755[_0x2e4762(0x30a,'3Y2@')]},'body':_0x5a04ec};}else{let _0x2fc4ea=this[_0x2e4762(0x1cf,'Miot')]['split']('?')[0x0],_0x1d4891=this[_0x2e4762(0x297,'zoi*')][_0x2e4762(0x2e1,'L(YQ')]('?')[0x1]['toLowerCase'](),_0x1a8fb0=_0x431f54[_0x2e4762(0x2c8,'Gj!x')](_0x2e4762(0x282,'lVCM')+_0x2a73be(_0x2fc4ea)+_0x2e4762(0x2ef,'GH&q')+_0x4c6be3+_0x5254af(_0x1d4891)+_0x2e4762(0x1ec,'rO5('))[_0x2e4762(0x2c1,'01]q')]();return{'url':_0x2e4762(0x1e7,'63No')+this[_0x2e4762(0x224,'cvLc')],'headers':{'User-Agent':_0x5de755['gWBlg'],'appInfo':_0x2e4762(0x2cd,'[&%R')+this['deviceId']+'\x22}','platform':'2','device':_0x2e4762(0x23d,'H)88'),'deviceSN':this[_0x2e4762(0x2ae,'5Wg!')],'Accept-Encoding':_0x5de755[_0x2e4762(0x2f2,'bUc6')],'Cookie':this['token'],'Cache-Control':_0x5de755[_0x2e4762(0x26b,'(ips')],'appKey':_0x5de755['wmZTg'],'ice-auth-appkey':_0x2e4762(0x27d,'75u*'),'ice-auth-timestamp':_0x4c6be3,'ice-auth-sign':_0x1a8fb0,'Host':_0x5de755[_0x2e4762(0x218,'L(YQ')],'Connection':_0x5de755['HPZyc']}};}}else{if(_0x5aca46)console[_0x2e4762(0x2a8,'h7RM')]('账号\x20'+this[_0x2e4762(0x25f,'^E%g')]+_0x2e4762(0x1e9,'^$bw')+_0x5aca46);else{if(_0x2e4762(0x305,'Miot')===_0x281c5b['KiKGw'])_0x4593de[_0x2e4762(0x1d0,'(ips')](_0x2e4762(0x33e,'5Wg!')+this[_0x2e4762(0x341,'zoi*')]+_0x2e4762(0x1b3,'^E%g')+_0x29be54[_0x2e4762(0x24e,'mCnE')]);else{var _0x55e5fb=JSON['parse'](_0x1a2194);if(_0x281c5b[_0x2e4762(0x21e,'tQ5)')](_0x55e5fb[_0x2e4762(0x22d,'L(YQ')],0x0))this[_0x2e4762(0x314,'GH&q')]=_0x55e5fb[_0x2e4762(0x230,'l2GW')][_0x2e4762(0x1f0,'01]q')],await this['getlogon']();else{if(_0x2e4762(0x275,'q3zY')===_0x281c5b[_0x2e4762(0x33c,'5Wg!')]){var _0x11e340=_0x365b40['parse'](_0x1963ec);_0x5de755[_0x2e4762(0x338,'tQ5)')](_0x11e340['code'],0x0)?_0x46316c['log']('账号\x20'+this[_0x2e4762(0x25b,'5Wg!')]+'\x20签到:'+_0x11e340['msg']+_0x2e4762(0x210,'zoi*')+_0x11e340[_0x2e4762(0x26a,'^E%g')][_0x2e4762(0x302,'bUc6')]+'天'):_0x31faf8[_0x2e4762(0x1f1,'Qioa')](_0x2e4762(0x284,'cvLc')+this[_0x2e4762(0x227,'63No')]+_0x2e4762(0x1d7,'O@48')+_0x11e340[_0x2e4762(0x31d,'(ips')]);}else console['log'](_0x2e4762(0x1ae,'t737')+this[_0x2e4762(0x1ff,'[&%R')]+_0x2e4762(0x20f,'Ysya')+_0x55e5fb[_0x2e4762(0x262,'L(YQ')]),subTitle+='账号\x20'+this[_0x2e4762(0x1b9,'#DR0')]+_0x2e4762(0x320,'63No')+_0x55e5fb[_0x2e4762(0x208,'YSki')];}}}}}catch(_0x350389){}finally{_0x281c5b[_0x2e4762(0x2ee,'ljwL')](_0x281c5b[_0x2e4762(0x2db,'rO5(')],_0x281c5b[_0x2e4762(0x236,'4SN)')])?_0x281c5b[_0x2e4762(0x29f,'Miot')](_0x53b07e):_0x3a1ece();};});});}async[_0x14b109(0x1c6,'lVCM')](){const _0x3c5ee4=_0x14b109,_0x22bfaf={'mjxfT':function(_0x12633f,_0x2f9891){return _0x12633f(_0x2f9891);},'GXvPQ':function(_0x2f6d27,_0x299f28){return _0x2f6d27!==_0x299f28;},'mEjhE':'TtRca','uFocu':_0x3c5ee4(0x319,'O@48'),'wzBpc':function(_0x31a088,_0xfae619){return _0x31a088!==_0xfae619;},'FQzrZ':_0x3c5ee4(0x2ed,'q3zY'),'ZErDZ':'set-cookie','vfZUp':function(_0x16b511,_0x258df3){return _0x16b511+_0x258df3;},'oLeig':function(_0x4e8411,_0x28cb9c){return _0x4e8411!==_0x28cb9c;},'gAZzM':_0x3c5ee4(0x27a,'9w4$'),'nxRXZ':_0x3c5ee4(0x286,'@AY2')};await Sleep_time(ys_s,ys_e),this['url']='/customer/app-vip-user/exterior/account/logon/password',this[_0x3c5ee4(0x237,'J45R')]=_0x3c5ee4(0x290,'5Wg!')+this['get_encrypted'](this['paw'])+_0x3c5ee4(0x1f5,'zoi*')+this[_0x3c5ee4(0x27b,'t]nf')]+_0x3c5ee4(0x2d6,'h7RM');let _0x5eb03d=this[_0x3c5ee4(0x23e,'t]nf')](0x1);return new Promise(_0x22cb90=>{const _0x551fad=_0x3c5ee4,_0x4b75f3={'SbClF':function(_0x1f157f,_0x1c0ecd){return _0x1f157f(_0x1c0ecd);}};if(_0x22bfaf[_0x551fad(0x1d1,'Miot')]!==_0x551fad(0x223,'XkIs'))throw new _0xd1c91a('\x0a找不到依赖\x20jsrsasign\x20,请自行安装\x0a');else $[_0x551fad(0x345,'cvLc')](_0x5eb03d,async(_0x92db60,_0x2423b4,_0x252f1c)=>{const _0x540f58=_0x551fad,_0x1144ea={'IWKVa':function(_0x4e8383,_0xda302d){const _0x189f5b=_0x39d5;return _0x22bfaf[_0x189f5b(0x2cf,'vfkX')](_0x4e8383,_0xda302d);}};if(_0x22bfaf['GXvPQ'](_0x22bfaf[_0x540f58(0x221,'[fPB')],_0x22bfaf['mEjhE']))_0x2ff9d5=_0x1e85b3[_0x540f58(0x1cd,'lVCM')]()?_0x1144ea['IWKVa'](_0x37d3d4,'fs'):'';else{try{if(_0x92db60)console[_0x540f58(0x245,'Ysya')](_0x540f58(0x33a,'#DR0')+this[_0x540f58(0x266,'Qioa')]+_0x540f58(0x1cb,'rO5(')+_0x92db60);else{if(_0x540f58(0x202,'zoi*')!==_0x22bfaf[_0x540f58(0x238,'bUc6')]){var _0x144abf=JSON[_0x540f58(0x33b,'cvLc')](_0x252f1c);if(_0x144abf['code']==0x0){if(_0x22bfaf['wzBpc'](_0x22bfaf[_0x540f58(0x229,'aw$^')],_0x22bfaf[_0x540f58(0x29b,'75u*')]))_0x7d79f4[_0x540f58(0x20e,'Gj!x')](_0x116b98);else{let _0x4a61e5='';for(let _0x35d111 in _0x2423b4['headers'][_0x22bfaf['ZErDZ']]){_0x4a61e5=_0x22bfaf[_0x540f58(0x2fb,'h7RM')](_0x4a61e5+_0x2423b4[_0x540f58(0x226,'aw$^')][_0x540f58(0x316,'YCoB')][_0x35d111],';');}this[_0x540f58(0x1c8,'lVCM')]=_0x4a61e5,await this[_0x540f58(0x283,'VQg^')]();}}else{if(_0x22bfaf[_0x540f58(0x255,'kW^%')](_0x22bfaf[_0x540f58(0x24f,'Ysya')],_0x22bfaf[_0x540f58(0x1b6,'5Wg!')])){let _0xf7cbd2=new _0x5e610e(_0x1f46a5,_0xdd7ecf);return _0xf7cbd2;}else console[_0x540f58(0x1b2,'rO5(')](_0x540f58(0x2af,'rO5(')+this['mob']+'\x20登录:'+_0x144abf[_0x540f58(0x31b,'@AY2')]),subTitle+=_0x540f58(0x1c2,'q3zY')+this[_0x540f58(0x1f7,'9w4$')]+_0x540f58(0x1f2,'aw$^')+_0x144abf[_0x540f58(0x1c4,'aw$^')];}}else _0x19a06f=_0x16ce1a[_0x540f58(0x257,'bUc6')]()?_0x4b75f3['SbClF'](_0x4e1446,'axios'):'';}}catch(_0x46032d){}finally{_0x22cb90();};}});});}async['signIn'](){const _0x1638ff=_0x14b109,_0x4021cc={'oFgAv':function(_0x324e54,_0x21a5aa){return _0x324e54===_0x21a5aa;},'QqMQR':'QAIGw','IbwRm':function(_0x4a8a07,_0x1e8b98,_0x3c24eb){return _0x4a8a07(_0x1e8b98,_0x3c24eb);}};await _0x4021cc['IbwRm'](Sleep_time,ys_s,ys_e),this[_0x1638ff(0x1fc,'WbW&')]=_0x1638ff(0x2d9,'Gj!x'),this[_0x1638ff(0x1da,'[&%R')]='';let _0x360392=this[_0x1638ff(0x2fc,'Gj!x')](0x0);return new Promise(_0x733af2=>{const _0x3c67c4=_0x1638ff,_0x2ba425={'ZUUoD':function(_0x50a790,_0x1691c6){const _0x3d4eda=_0x39d5;return _0x4021cc[_0x3d4eda(0x272,'@AY2')](_0x50a790,_0x1691c6);},'pMxbZ':_0x4021cc[_0x3c67c4(0x2e0,'tQ5)')],'FEdqc':_0x3c67c4(0x281,'9w4$')};$['get'](_0x360392,async(_0x166b71,_0x65d2e5,_0x25b3b1)=>{const _0x37c52f=_0x3c67c4;try{if(_0x166b71)console[_0x37c52f(0x2a2,'5Wg!')](_0x37c52f(0x27e,'B6s3')+this[_0x37c52f(0x246,'t737')]+_0x37c52f(0x23c,'ljwL')+_0x166b71);else{var _0x56a793=JSON[_0x37c52f(0x2b6,'01]q')](_0x25b3b1);_0x56a793['code']==0x0?console[_0x37c52f(0x205,'B6s3')](_0x37c52f(0x244,'zoi*')+this[_0x37c52f(0x30c,'vfkX')]+_0x37c52f(0x30e,'63No')+_0x56a793[_0x37c52f(0x33f,'zoi*')]+_0x37c52f(0x2c6,'l2GW')+_0x56a793['data'][_0x37c52f(0x2de,'VQg^')]+'天'):console[_0x37c52f(0x1af,'H)88')](_0x37c52f(0x2c7,'aw$^')+this['mob']+_0x37c52f(0x24b,'kW^%')+_0x56a793[_0x37c52f(0x208,'YSki')]);}}catch(_0x3b30ca){}finally{if(_0x2ba425['ZUUoD'](_0x2ba425[_0x37c52f(0x2c9,'XkIs')],_0x2ba425['FEdqc']))return new _0x5dbd4d(_0x5c3fef=>_0x18f72d(_0x5c3fef,_0x3836e3));else _0x733af2();};});});}[_0x14b109(0x23f,'YSki')](_0x2f4d03){const _0x4b5c89=_0x14b109,_0x44d152={'heoHz':function(_0x130243,_0x14804c){return _0x130243+_0x14804c;},'ZfODb':function(_0x130fcf,_0x1fc684){return _0x130fcf+_0x1fc684;},'AVCDd':_0x4b5c89(0x342,'r4aZ'),'fPeyY':function(_0x2e2801,_0x404092){return _0x2e2801==_0x404092;},'BVqft':function(_0x5e0d78,_0x219c92){return _0x5e0d78(_0x219c92);},'mcjvU':_0x4b5c89(0x2a1,'^E%g'),'rVMsy':_0x4b5c89(0x2d3,'[fPB'),'rliGm':'identity','XtYBQ':_0x4b5c89(0x334,'^E%g'),'Fxrjp':_0x4b5c89(0x2c2,'tQ5)'),'WtSlX':_0x4b5c89(0x1c1,'t737'),'VlZjZ':'DWoCK','NQfFn':'toIbV','rbeCU':_0x4b5c89(0x32d,'^$bw'),'slwqQ':_0x4b5c89(0x2a9,'4SN)')};let _0xd48a2b=new Date()[_0x4b5c89(0x1b1,'t737')]();if(_0x44d152[_0x4b5c89(0x28b,'r4aZ')](_0x2f4d03,0x1)){let _0x941b4f=CryptoJs['SHA256'](_0x4b5c89(0x26c,'B6s3')+_0x44d152[_0x4b5c89(0x1d9,'XkIs')](encodeURIComponent,this[_0x4b5c89(0x280,'q3zY')])+_0x4b5c89(0x20b,'5Wg!')+_0xd48a2b+'json'+_0x44d152[_0x4b5c89(0x318,'ljwL')](encodeURIComponent,this[_0x4b5c89(0x278,'O@48')])+_0x4b5c89(0x2ca,'Gj!x'))['toString'](),_0x489407=this['body'];return{'url':_0x4b5c89(0x249,'GH&q')+this['url'],'headers':{'User-Agent':_0x44d152[_0x4b5c89(0x240,'t737')],'appInfo':_0x4b5c89(0x29a,'B6s3')+this[_0x4b5c89(0x268,'lVCM')]+'\x22}','platform':'2','device':_0x44d152[_0x4b5c89(0x242,'L(YQ')],'deviceSN':this['deviceId'],'Accept-Encoding':_0x44d152[_0x4b5c89(0x1e2,'H5FP')],'Cookie':this[_0x4b5c89(0x254,'5Wg!')],'Cache-Control':_0x4b5c89(0x310,'q3zY'),'appKey':_0x44d152['XtYBQ'],'ice-auth-appkey':_0x4b5c89(0x263,'9w4$'),'ice-auth-timestamp':_0xd48a2b,'ice-auth-sign':_0x941b4f,'Content-Type':_0x44d152[_0x4b5c89(0x1be,'rO5(')],'Content-Length':_0x489407[_0x4b5c89(0x1df,'O@48')],'Host':_0x4b5c89(0x21d,'XkIs'),'Connection':_0x44d152[_0x4b5c89(0x1b5,'rO5(')]},'body':_0x489407};}else{if(_0x44d152[_0x4b5c89(0x2a0,'Qioa')]===_0x44d152['NQfFn'])_0x1b741e=_0x44d152[_0x4b5c89(0x2aa,'l2GW')](_0x44d152[_0x4b5c89(0x1bd,'^E%g')](_0x1e666f,_0xb00097[_0x4b5c89(0x231,'^$bw')][_0x44d152[_0x4b5c89(0x295,'t]nf')]][_0x36b887]),';');else{let _0x208d6c=this[_0x4b5c89(0x32b,'9w4$')]['split']('?')[0x0],_0x228ede=this[_0x4b5c89(0x1fe,'[&%R')][_0x4b5c89(0x328,'@AY2')]('?')[0x1][_0x4b5c89(0x299,'5Wg!')](),_0x4db14f=CryptoJs['SHA256'](_0x4b5c89(0x215,'63No')+encodeURIComponent(_0x208d6c)+'ice-auth-appkey%3A9831532554ice-auth-timestamp%3A'+_0xd48a2b+_0x44d152['BVqft'](encodeURIComponent,_0x228ede)+_0x4b5c89(0x28d,'mCnE'))[_0x4b5c89(0x1ba,'9w4$')]();return{'url':_0x4b5c89(0x28a,'Gj!x')+this[_0x4b5c89(0x321,'R1bO')],'headers':{'User-Agent':_0x44d152[_0x4b5c89(0x21f,'R1bO')],'appInfo':_0x4b5c89(0x327,'H5FP')+this[_0x4b5c89(0x309,'tQ5)')]+'\x22}','platform':'2','device':_0x44d152['rVMsy'],'deviceSN':this['deviceId'],'Accept-Encoding':_0x4b5c89(0x2f0,'B6s3'),'Cookie':this[_0x4b5c89(0x1e8,'XkIs')],'Cache-Control':_0x44d152['rbeCU'],'appKey':_0x44d152[_0x4b5c89(0x1f3,'YCoB')],'ice-auth-appkey':_0x44d152['XtYBQ'],'ice-auth-timestamp':_0xd48a2b,'ice-auth-sign':_0x4db14f,'Host':_0x44d152[_0x4b5c89(0x2ec,'r4aZ')],'Connection':_0x44d152[_0x4b5c89(0x24a,'YSki')]}};}}}[_0x14b109(0x32e,'VQg^')](_0x3372ec){const _0x4c1268=_0x14b109,_0x40ae95={'kyrHe':_0x4c1268(0x25a,'q3zY'),'VatZw':_0x4c1268(0x313,'63No'),'WMJJZ':_0x4c1268(0x1e0,'YSki'),'CfdAW':_0x4c1268(0x2e3,'ljwL'),'zwNJE':_0x4c1268(0x29c,'^$bw')};let _0x58e913=new NodeRSA();_0x58e913['importKey'](this['PublicKey'],_0x40ae95['kyrHe']);let _0x274eed=_0x58e913[_0x4c1268(0x2be,'H)88')](_0x3372ec,_0x40ae95[_0x4c1268(0x296,'t737')],_0x40ae95[_0x4c1268(0x2dc,'XkIs')],{'encryptionScheme':{'scheme':_0x40ae95[_0x4c1268(0x2ba,'YCoB')],'hash':_0x40ae95[_0x4c1268(0x276,'q3zY')]}});return _0x274eed;}}!(async()=>{const _0x4d32c6=_0x14b109,_0x184bef={'SZrKf':function(_0x56cab5,_0x3017be){return _0x56cab5(_0x3017be);},'sGDDm':function(_0x459bc1,_0x39fd2e){return _0x459bc1==_0x39fd2e;},'cCcJk':function(_0xe9826f,_0x3d405b){return _0xe9826f!==_0x3d405b;},'zXvFL':_0x4d32c6(0x1b8,'mCnE')};console['log'](_0x4d32c6(0x26d,'YCoB'));let _0x227344=await getUsers(variable,async(_0x244a56,_0x17881a)=>{let _0x8444ba=new UserInfo(_0x244a56,_0x17881a);return _0x8444ba;});if(Concurrency)list=[],_0x227344[_0x4d32c6(0x253,'R1bO')](async _0x35e02d=>{list['push'](main(_0x35e02d));}),await Promise[_0x4d32c6(0x1e4,'t737')](list);else for(let _0x3a8979 in _0x227344){await _0x184bef[_0x4d32c6(0x2e7,'mCnE')](main,_0x227344[_0x3a8979]);}_0x184bef[_0x4d32c6(0x306,'t737')](get_msg,0x1)&&(notify&&(subTitle&&(_0x184bef['cCcJk'](_0x184bef['zXvFL'],_0x4d32c6(0x291,'[fPB'))?await notify[_0x4d32c6(0x2dd,'(ips')]($[_0x4d32c6(0x340,'(ips')],subTitle):_0x18aee9[_0x4d32c6(0x26f,'t737')](_0x4d32c6(0x2d7,'Ysya')+this[_0x4d32c6(0x1dd,'01]q')]+_0x4d32c6(0x2fe,'tQ5)')+_0x3eb8df))));})()[_0x14b109(0x273,'lVCM')](_0x391363=>console[_0x14b109(0x2f4,'YCoB')](_0x391363))[_0x14b109(0x2bb,'J45R')](()=>$[_0x14b109(0x1fa,'@AY2')]());async function getUsers(_0x499f0a,_0x4ee99a){const _0x5f2b59=_0x14b109,_0x384dc3={'DgEZY':_0x5f2b59(0x21c,'O@48'),'afAlB':function(_0xad372e,_0x1e67c3){return _0xad372e-_0x1e67c3;},'LzQpH':function(_0x2924bd,_0x46eb91){return _0x2924bd*_0x46eb91;},'RpltO':function(_0x18e58f,_0x50fefb){return _0x18e58f(_0x50fefb);},'xuKeN':_0x5f2b59(0x220,'YSki'),'tjhFu':function(_0x22720e,_0x34e983){return _0x22720e===_0x34e983;},'WTmpf':_0x5f2b59(0x308,'vfkX'),'GJySo':function(_0x4fc712,_0x22e9b8){return _0x4fc712>_0x22e9b8;},'DtjVh':_0x5f2b59(0x287,'Miot'),'GthmL':function(_0x36bf4f,_0x369c3e){return _0x36bf4f<_0x369c3e;},'dqsWU':_0x5f2b59(0x346,'Ysya'),'BhLfn':function(_0x2ab6cc,_0x57b31a,_0x300646){return _0x2ab6cc(_0x57b31a,_0x300646);},'deoBv':function(_0xa058fa,_0x269721){return _0xa058fa!==_0x269721;},'hKEKK':'XTujm','OrQxY':_0x5f2b59(0x28f,'%P8K'),'sIdCA':function(_0x1d297f,_0x5db24d){return _0x1d297f+_0x5db24d;},'jwYeA':function(_0x557e7c,_0x106483){return _0x557e7c*_0x106483;},'TweEI':function(_0x5d3307,_0xa253a0){return _0x5d3307*_0xa253a0;},'haYWL':function(_0x3b13d4,_0x80bc8b){return _0x3b13d4*_0x80bc8b;}};let _0x251182=[],_0x52f0ff=process['env'][_0x499f0a],_0x4504b0=['\x0a','#','@'];if(_0x52f0ff){if(_0x384dc3['tjhFu']('qzlwK',_0x384dc3[_0x5f2b59(0x333,'vfkX')])){let _0x1a288e=_0x4504b0[0x0];for(let _0x6e3c20 of _0x4504b0)if(_0x384dc3['GJySo'](_0x52f0ff[_0x5f2b59(0x269,'O@48')](_0x6e3c20),-0x1)){if(_0x384dc3['tjhFu'](_0x384dc3[_0x5f2b59(0x28e,'WbW&')],_0x384dc3[_0x5f2b59(0x22f,'(ips')])){_0x1a288e=_0x6e3c20;break;}else{let _0x59de91=_0x384dc3[_0x5f2b59(0x2f3,'q3zY')],_0x1eea04='';for(let _0x4d57b4=0x0;_0x4d57b4<_0x47b8ca;_0x4d57b4++){let _0x23bb89=_0x4941b2[_0x5f2b59(0x28c,'^E%g')](_0x384dc3[_0x5f2b59(0x2e8,'@AY2')](_0x384dc3['LzQpH'](_0x23c45b['random'](),_0x59de91[_0x5f2b59(0x1e3,'Gj!x')]),0x1));_0x1eea04+=_0x59de91[_0x23bb89];}return _0x1eea04;}}let _0x5b80ee=_0x52f0ff['split'](_0x1a288e);for(let _0x593977=0x0;_0x384dc3[_0x5f2b59(0x2cb,'kW^%')](_0x593977,_0x5b80ee[_0x5f2b59(0x1ef,'aw$^')]);_0x593977++){if(_0x384dc3['dqsWU']==='UOrRA'){const _0x530f20=_0x5b80ee[_0x593977];_0x530f20&&_0x251182[_0x5f2b59(0x274,'vfkX')](await _0x384dc3['BhLfn'](_0x4ee99a,_0x593977,_0x530f20));}else _0x1016bf=_0x41d71e[_0x5f2b59(0x1cd,'lVCM')]()?_0x384dc3['RpltO'](_0x1e19fc,_0x384dc3['xuKeN']):'';}user_num=_0x251182[_0x5f2b59(0x1e3,'Gj!x')];}else _0x222af7=_0x4ea725['isNode']()?_0x4a3740('os'):'';}else{if(_0x384dc3['deoBv'](_0x384dc3[_0x5f2b59(0x1e6,'^$bw')],_0x384dc3['hKEKK']))throw new _0x6fcf69('\x0a找不到依赖\x20fs\x20,请自行安装\x0a');else console['log'](_0x384dc3['OrQxY']);}return console['log'](_0x5f2b59(0x2a4,'GH&q')+new Date(_0x384dc3[_0x5f2b59(0x222,'q3zY')](new Date()[_0x5f2b59(0x292,'#DR0')](),new Date()['getTimezoneOffset']()*0x3c*0x3e8)+_0x384dc3[_0x5f2b59(0x27c,'01]q')](_0x384dc3[_0x5f2b59(0x1db,'Miot')](_0x384dc3[_0x5f2b59(0x2e2,'R1bO')](0x8,0x3c),0x3c),0x3e8))[_0x5f2b59(0x213,'kW^%')]()+_0x5f2b59(0x289,'bUc6')),(console['log'](_0x5f2b59(0x1bf,'bUc6')+user_num+'\x20个账号】==='),!0x0),_0x251182;}function getnum(_0x2114d6){const _0x514c07=_0x14b109,_0x2cc81b={'ZJnGo':function(_0x5f00b9,_0x4969f9){return _0x5f00b9(_0x4969f9);},'TntRH':'okhttp/3.14.9\x20(Android\x2014;\x20\x20\x20Build/V14.0.4.0.UMCCNXM\x203.2.6\x2040059\x20release\x20dflqApp)','vifVw':_0x514c07(0x26e,'5Wg!'),'mLqye':'no-cache','czQVQ':'9831532554','KjRXF':'lqdm-app.dflzm.com','HLkNU':_0x514c07(0x301,'cvLc'),'aNkRx':_0x514c07(0x2a3,'%P8K'),'Fkort':function(_0x2db8,_0x3f44e4){return _0x2db8<_0x3f44e4;},'iUFmV':function(_0x20146d,_0x3f9f9c){return _0x20146d!==_0x3f9f9c;},'oHCCx':_0x514c07(0x317,'rO5('),'DuHzS':function(_0x458079,_0x498bad){return _0x458079-_0x498bad;}};let _0xfa1c22=_0x2cc81b[_0x514c07(0x285,'aw$^')],_0x5c713e='';for(let _0x385501=0x0;_0x2cc81b[_0x514c07(0x2ea,'lVCM')](_0x385501,_0x2114d6);_0x385501++){if(_0x2cc81b[_0x514c07(0x1fb,'H5FP')](_0x2cc81b[_0x514c07(0x219,'L(YQ')],'yqvFv')){let _0x49b3e4=Math[_0x514c07(0x2b7,'[fPB')](_0x2cc81b[_0x514c07(0x2f6,'q3zY')](Math[_0x514c07(0x2b4,'L(YQ')]()*_0xfa1c22[_0x514c07(0x2f1,'01]q')],0x1));_0x5c713e+=_0xfa1c22[_0x49b3e4];}else{let _0x1fcafd=this['url'][_0x514c07(0x2c0,'q3zY')]('?')[0x0],_0x200bef=this[_0x514c07(0x1fc,'WbW&')][_0x514c07(0x252,'zoi*')]('?')[0x1][_0x514c07(0x2a6,'63No')](),_0x3a20ac=_0x26d1a4[_0x514c07(0x1d5,'r4aZ')](_0x514c07(0x312,'Qioa')+_0x2cc81b['ZJnGo'](_0x24777b,_0x1fcafd)+_0x514c07(0x1d8,'ljwL')+_0x105a3f+_0x325340(_0x200bef)+'3b8379a44daa6ab982c886d8bcdcc82a')[_0x514c07(0x2d0,'rO5(')]();return{'url':_0x514c07(0x332,'O@48')+this['url'],'headers':{'User-Agent':_0x2cc81b[_0x514c07(0x322,'h7RM')],'appInfo':'{\x22appVersion\x22:\x223.2.6\x22,\x22osVersion\x22:\x22Android\x2014\x22,\x22appType\x22:\x22Android\x22,\x22deviceName\x22:\x22\x20\x22,\x22deviceId\x22:\x22'+this['deviceId']+'\x22}','platform':'2','device':_0x2cc81b['vifVw'],'deviceSN':this['deviceId'],'Accept-Encoding':_0x514c07(0x1bb,'R1bO'),'Cookie':this['token'],'Cache-Control':_0x2cc81b[_0x514c07(0x2cc,'zoi*')],'appKey':_0x2cc81b['czQVQ'],'ice-auth-appkey':_0x2cc81b[_0x514c07(0x22c,'WbW&')],'ice-auth-timestamp':_0x2ac85a,'ice-auth-sign':_0x3a20ac,'Host':_0x2cc81b['KjRXF'],'Connection':_0x2cc81b[_0x514c07(0x1f6,'Gj!x')]}};}}return _0x5c713e;}function getstr(_0x14e488){const _0x36c6de=_0x14b109,_0x27ee13={'GOWnG':_0x36c6de(0x261,'@AY2'),'MfCwc':function(_0xdb9790,_0x5ab4ed){return _0xdb9790<_0x5ab4ed;},'RSHag':function(_0x4845ef,_0x1b3a80){return _0x4845ef-_0x1b3a80;},'SdLzW':function(_0x31b3de,_0x215b1a){return _0x31b3de*_0x215b1a;}};let _0x1f0abb=_0x27ee13['GOWnG'],_0x59534c='';for(let _0xace4a7=0x0;_0x27ee13[_0x36c6de(0x30b,'aw$^')](_0xace4a7,_0x14e488);_0xace4a7++){let _0x10f3dc=Math['ceil'](_0x27ee13[_0x36c6de(0x2b0,'VQg^')](_0x27ee13[_0x36c6de(0x29d,'YCoB')](Math[_0x36c6de(0x1e5,'r4aZ')](),_0x1f0abb[_0x36c6de(0x24d,'VQg^')]),0x1));_0x59534c+=_0x1f0abb[_0x10f3dc];}return _0x59534c;}async function Sleep_time(_0x409193,_0xb914b5){const _0xf72629=_0x14b109,_0x455c07={'bZaRX':function(_0x38ff4e,_0x460f82){return _0x38ff4e+_0x460f82;},'cNgVi':function(_0x49e5a1,_0xb0c125){return _0x49e5a1*_0xb0c125;},'jAyfi':function(_0xd74532,_0x533121){return _0xd74532-_0x533121;},'XzDUV':function(_0x42bd47,_0x18c600){return _0x42bd47*_0x18c600;}};await wait(_0x455c07[_0xf72629(0x271,'VQg^')](Math[_0xf72629(0x1ed,'H)88')](_0x455c07[_0xf72629(0x1d6,'zoi*')](Math['random'](),_0x455c07[_0xf72629(0x259,'9w4$')](_0x455c07['jAyfi'](_0xb914b5*0x3e8,_0x409193*0x3e8),0x1))),_0x455c07[_0xf72629(0x1fd,'[fPB')](_0x409193,0x3e8)));}async function wait(_0x132365){return new Promise(_0x1d4b22=>setTimeout(_0x1d4b22,_0x132365));}function Format_time(){const _0x20cd57=_0x14b109,_0x4a7c16={'CrEHS':function(_0x242367,_0x5a9996){return _0x242367+_0x5a9996;},'NWMJf':function(_0xe86094,_0x5c99f9){return _0xe86094<_0x5c99f9;},'TWeUY':function(_0x2de762,_0x2bce92){return _0x2de762+_0x2bce92;},'wbqvQ':function(_0x3cb085,_0x4b013d){return _0x3cb085+_0x4b013d;},'AyBOX':function(_0x10a2e7,_0x4ad995){return _0x10a2e7+_0x4ad995;},'dZvbR':function(_0xe1204e,_0x32eb74){return _0xe1204e+_0x32eb74;},'BteCd':function(_0x298b73,_0x13d203){return _0x298b73+_0x13d203;},'kKahD':function(_0x43dc67,_0x1026f7){return _0x43dc67+_0x1026f7;}};var _0x5d84a6=new Date(new Date()[_0x20cd57(0x304,'rO5(')]()),_0x50964d=_0x4a7c16['CrEHS'](_0x5d84a6['getFullYear'](),'-'),_0x3595cb=(_0x4a7c16[_0x20cd57(0x200,'mCnE')](_0x4a7c16[_0x20cd57(0x21a,'VQg^')](_0x5d84a6[_0x20cd57(0x2df,'lVCM')](),0x1),0xa)?_0x4a7c16['CrEHS']('0',_0x4a7c16[_0x20cd57(0x21a,'VQg^')](_0x5d84a6[_0x20cd57(0x20c,'01]q')](),0x1)):_0x4a7c16[_0x20cd57(0x23b,'H5FP')](_0x5d84a6[_0x20cd57(0x2df,'lVCM')](),0x1))+'-',_0xbe9a5=_0x4a7c16['wbqvQ'](_0x5d84a6[_0x20cd57(0x225,'kW^%')]()<0xa?_0x4a7c16['TWeUY']('0',_0x5d84a6['getDate']()):_0x5d84a6[_0x20cd57(0x251,'5Wg!')](),'\x20'),_0x3f5362=(_0x5d84a6[_0x20cd57(0x2b8,'r4aZ')]()<0xa?_0x4a7c16[_0x20cd57(0x216,'L(YQ')]('0',_0x5d84a6[_0x20cd57(0x2b1,'tQ5)')]()):_0x5d84a6[_0x20cd57(0x2b3,'h7RM')]())+':',_0x1acd33=_0x4a7c16[_0x20cd57(0x24c,'GH&q')](_0x5d84a6['getMinutes']()<0xa?_0x4a7c16[_0x20cd57(0x203,'l2GW')]('0',_0x5d84a6[_0x20cd57(0x2eb,'VQg^')]()):_0x5d84a6[_0x20cd57(0x214,'75u*')](),':'),_0x421e3e=_0x4a7c16[_0x20cd57(0x21b,'cvLc')](_0x5d84a6[_0x20cd57(0x2d1,'kW^%')](),0xa)?'0'+_0x5d84a6[_0x20cd57(0x25c,'^E%g')]():_0x4a7c16['wbqvQ'](_0x4a7c16[_0x20cd57(0x25e,'01]q')](_0x5d84a6['getSeconds'](),'.'),getnum(0x3));let _0x3ec0d9=_0x4a7c16[_0x20cd57(0x2ac,'#DR0')](_0x4a7c16['dZvbR'](_0x4a7c16[_0x20cd57(0x2e6,'zoi*')](_0x50964d,_0x3595cb),_0xbe9a5),_0x3f5362)+_0x1acd33+_0x421e3e;return _0x3ec0d9;}function Format_time1(){const _0x2cb417=_0x14b109,_0x140486={'XMMil':function(_0x2398a3,_0x5e3ccc){return _0x2398a3+_0x5e3ccc;},'TCGYH':function(_0x171397,_0x2b3bc4){return _0x171397<_0x2b3bc4;},'DQTqN':function(_0x3ad1cf,_0x259b9b){return _0x3ad1cf+_0x259b9b;},'Bmfem':function(_0x501fbb,_0x501740){return _0x501fbb+_0x501740;},'TPDTd':function(_0x482d13,_0x5ce361){return _0x482d13<_0x5ce361;},'vYKCW':function(_0x3bcb48,_0x343496){return _0x3bcb48+_0x343496;},'EoTzu':function(_0x4b6071,_0x5c1e09){return _0x4b6071+_0x5c1e09;}};var _0xc76051=new Date(new Date()['getTime']()),_0x380dba=_0x140486['XMMil'](_0xc76051[_0x2cb417(0x260,'lVCM')](),'-'),_0x5f14c2=(_0x140486[_0x2cb417(0x256,'XkIs')](_0x140486[_0x2cb417(0x234,'l2GW')](_0xc76051[_0x2cb417(0x2ab,'H5FP')](),0x1),0xa)?_0x140486['XMMil']('0',_0xc76051['getMonth']()+0x1):_0xc76051[_0x2cb417(0x2b2,'4SN)')]()+0x1)+'-',_0x564c4d=_0xc76051[_0x2cb417(0x1cc,'@AY2')](),_0x21c92c=_0x140486[_0x2cb417(0x243,'ljwL')](_0x140486[_0x2cb417(0x2e9,'O@48')](_0xc76051[_0x2cb417(0x2c3,'#DR0')](),0xa)?_0x140486[_0x2cb417(0x2c4,'H5FP')]('0',_0xc76051['getHours']()):_0xc76051[_0x2cb417(0x1de,'H5FP')](),':'),_0x5da511=(_0x140486[_0x2cb417(0x2fd,'J45R')](_0xc76051[_0x2cb417(0x1e1,'rO5(')](),0xa)?_0x140486[_0x2cb417(0x211,'[&%R')]('0',_0xc76051[_0x2cb417(0x2b9,'#DR0')]()):_0xc76051['getMinutes']())+':',_0x3bca17=_0x140486[_0x2cb417(0x207,'3Y2@')](_0xc76051[_0x2cb417(0x336,'3Y2@')](),0xa)?_0x140486[_0x2cb417(0x2e4,'YSki')]('0',_0xc76051[_0x2cb417(0x1eb,'%P8K')]()):_0xc76051[_0x2cb417(0x344,'h7RM')]();let _0x39ed35=_0x140486[_0x2cb417(0x31f,'t737')](_0x140486[_0x2cb417(0x293,'B6s3')](_0x380dba,_0x5f14c2),_0x564c4d);return _0x39ed35;}var version_ = 'jsjiami.com.v7';


function Env(t, e) {
  class s {
    constructor(t) {
      this.env = t
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let s = this.get;
      return "POST" === e && (s = this.post), new Promise((e, i) => {
        s.call(this, t, (t, s, r) => {
          t ? i(t) : e(s)
        })
      })
    }
    get(t) {
      return this.send.call(this.env, t)
    }
    post(t) {
      return this.send.call(this.env, t, "POST")
    }
  }
  return new class {
    constructor(t, e) {
      this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`)
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports
    }
    isQuanX() {
      return "undefined" != typeof $task
    }
    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon
    }
    isLoon() {
      return "undefined" != typeof $loon
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t)
      } catch {
        return e
      }
    }
    toStr(t, e = null) {
      try {
        return JSON.stringify(t)
      } catch {
        return e
      }
    }
    getjson(t, e) {
      let s = e;
      const i = this.getdata(t);
      if (i) try {
        s = JSON.parse(this.getdata(t))
      } catch {}
      return s
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e)
      } catch {
        return !1
      }
    }
    getScript(t) {
      return new Promise(e => {
        this.get({
          url: t
        }, (t, s, i) => e(i))
      })
    }
    runScript(t, e) {
      return new Promise(s => {
        let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i.replace(/\n/g, "").trim() : i;
        let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
        const [o, h] = i.split("@"), a = {
          url: `http://${h}/v1/scripting/evaluate`,
          body: {
            script_text: t,
            mock_type: "cron",
            timeout: r
          },
          headers: {
            "X-Key": o,
            Accept: "*/*"
          }
        };
        this.post(a, (t, e, i) => s(i))
      }).catch(t => this.logErr(t))
    }
    loaddata() {
      if (!this.isNode()) return {}; {
        this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e);
        if (!s && !i) return {}; {
          const i = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(i))
          } catch (t) {
            return {}
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e),
          r = JSON.stringify(this.data);
        s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
      }
    }
    lodash_get(t, e, s) {
      const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let r = t;
      for (const t of i)
        if (r = Object(r)[t], void 0 === r) return s;
      return r
    }
    lodash_set(t, e, s) {
      return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
        if (r) try {
          const t = JSON.parse(r);
          e = t ? this.lodash_get(t, i, "") : e
        } catch (t) {
          e = ""
        }
      }
      return e
    }
    setdata(t, e) {
      let s = !1;
      if (/^@/.test(e)) {
        const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}";
        try {
          const e = JSON.parse(h);
          this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
        } catch (e) {
          const o = {};
          this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
        }
      } else s = this.setval(t, e);
      return s
    }
    getval(t) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
    }
    setval(t, e) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
    }
    get(t, e = (() => {})) {
      t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
      })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o)
      }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
        try {
          if (t.headers["set-cookie"]) {
            const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
          }
        } catch (t) {
          this.logErr(t)
        }
      }).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o)
      }, t => {
        const {
          message: s,
          response: i
        } = t;
        e(s, i, i && i.body)
      }))
    }
    post(t, e = (() => {})) {
      if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.post(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
      });
      else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o)
      }, t => e(t));
      else if (this.isNode()) {
        this.initGotEnv(t);
        const {
          url: s,
          ...i
        } = t;
        this.got.post(s, i).then(t => {
          const {
            statusCode: s,
            statusCode: i,
            headers: r,
            body: o
          } = t;
          e(null, {
            status: s,
            statusCode: i,
            headers: r,
            body: o
          }, o)
        }, t => {
          const {
            message: s,
            response: i
          } = t;
          e(s, i, i && i.body)
        })
      }
    }
    time(t) {
      let e = {
        "M+": (new Date).getMonth() + 1,
        "d+": (new Date).getDate(),
        "H+": (new Date).getHours(),
        "m+": (new Date).getMinutes(),
        "s+": (new Date).getSeconds(),
        "q+": Math.floor(((new Date).getMonth() + 3) / 3),
        S: (new Date).getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
      return t
    }
    msg(e = t, s = "", i = "", r) {
      const o = t => {
        if (!t) return t;
        if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
          "open-url": t
        } : this.isSurge() ? {
          url: t
        } : void 0;
        if ("object" == typeof t) {
          if (this.isLoon()) {
            let e = t.openUrl || t.url || t["open-url"],
              s = t.mediaUrl || t["media-url"];
            return {
              openUrl: e,
              mediaUrl: s
            }
          }
          if (this.isQuanX()) {
            let e = t["open-url"] || t.url || t.openUrl,
              s = t["media-url"] || t.mediaUrl;
            return {
              "open-url": e,
              "media-url": s
            }
          }
          if (this.isSurge()) {
            let e = t.url || t.openUrl || t["open-url"];
            return {
              url: e
            }
          }
        }
      };
      this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
      let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
      h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h)
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
    }
    logErr(t, e) {
      const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t))
    }
    done(t = {}) {
      const e = (new Date).getTime(),
        s = (e - this.startTime) / 1e3;
      this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
    }
  }(t, e)
}
