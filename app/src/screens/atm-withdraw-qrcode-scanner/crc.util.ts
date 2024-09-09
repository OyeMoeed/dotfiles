/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable eqeqeq */
/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-bitwise */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
export class Crc {
  scanData = {
    arr: [],
    cashBackObj: {
      Type: '',
      WalletNum: '',
      Amount: '',
      Currency: '',
      UID: '',
    },
    atmtObj: { Type: '', ID: '' },
    scannedData: null,
    merchantWalletObj: { Type: '', WalletNum: '', UID: '' },
    crcCheck: null,

    scanStringData(str: string) {
      let CRCData = str.substr(0, str.length - 4);
      console.log(CRCData);
      const utils = new Crc();
      utils.CRCMaster.init();
      let CRCResult = utils.CRCMaster.Calculate(CRCData, 'ASCII').crc16;
      if (CRCResult.length == 1) {
        CRCResult = '000' + CRCResult;
      } else if (CRCResult.length == 2) {
        CRCResult = '00' + CRCResult;
      } else if (CRCResult.length == 3) {
        CRCResult = '0' + CRCResult;
      }

      let sentData: any = { name: '', id: '', value: '' };
      let y = 0;
      for (let x = 0; x < str.length; x = y) {
        let str1 = str.substr(y, 2);
        let strLength1 = parseInt(str.substr(y + 2, 2));
        let strValue1 = str.substr(y + 4, strLength1);
        y = y + 4 + strLength1;
        console.log(str1, strLength1, strValue1);
        switch (str1) {
          case '00': {
            console.log('payloadFormatIndicator =' + strValue1);
            sentData.name = 'payloadFormatIndicator';
            sentData.id = str1;
            sentData.value = strValue1;
            this.arr.push(sentData);
            sentData = { name: '', id: '', value: '' };
            break;
          }
          case '02': {
            console.log('merchantAccountInformation_Visa =' + strValue1);
            sentData.name = 'merchantAccountInformation_Visa';
            sentData.id = str1;
            sentData.value = strValue1;
            this.arr.push(sentData);
            sentData = { name: '', id: '', value: '' };
            break;
          }
          case '04': {
            console.log('merchantAccountInformation_Mastercard =' + strValue1);
            sentData.name = 'merchantAccountInformation_Mastercard';
            sentData.id = str1;
            sentData.value = strValue1;
            this.arr.push(sentData);
            sentData = { name: '', id: '', value: '' };
            break;
          }
          case '15': {
            console.log('merchantAccountInformation_UnionPay =' + strValue1);
            sentData.name = 'merchantAccountInformation_UnionPay';
            sentData.id = str1;
            sentData.value = strValue1;
            this.arr.push(sentData);
            sentData = { name: '', id: '', value: '' };
            break;
          }
          case '52': {
            console.log('merchantCategoryCode =' + strValue1);
            sentData.name = 'merchantCategoryCode';
            sentData.id = str1;
            sentData.value = strValue1;
            this.arr.push(sentData);
            sentData = { name: '', id: '', value: '' };
            break;
          }
          case '53': {
            console.log('transactionCurrency =' + strValue1);
            sentData.name = 'transactionCurrency';
            sentData.id = str1;
            sentData.value = strValue1;
            this.arr.push(sentData);
            sentData = { name: '', id: '', value: '' };
            break;
          }
          case '54': {
            console.log('transactionAmount =' + strValue1);
            sentData.name = 'transactionAmount';
            sentData.id = str1;
            sentData.value = strValue1;
            this.arr.push(sentData);
            sentData = { name: '', id: '', value: '' };
            break;
          }

          case '58': {
            console.log('countryCode =' + strValue1);
            sentData.name = 'countryCode';
            sentData.id = str1;
            sentData.value = strValue1;
            this.arr.push(sentData);
            sentData = { name: '', id: '', value: '' };
            break;
          }
          case '59': {
            console.log('merchantName =' + strValue1);
            sentData.name = 'merchantName';
            sentData.id = str1;
            sentData.value = strValue1;
            this.arr.push(sentData);
            sentData = { name: '', id: '', value: '' };
            break;
          }
          case '60': {
            console.log('merchantCity =' + strValue1);
            sentData.name = 'merchantCity';
            sentData.id = str1;
            sentData.value = strValue1;
            this.arr.push(sentData);
            sentData = { name: '', id: '', value: '' };
            break;
          }

          case '63': {
            console.log('CRC = ' + strValue1);
            sentData.name = 'CRC';
            sentData.id = str1;
            sentData.value = strValue1;
            this.arr.push(sentData);
            sentData = { name: '', id: '', value: '' };
            break;
          }
          case '32': {
            sentData.name = 'merchantAccountInformation_SAQRUnifiedDetails';
            sentData.id = str1;
            sentData.value = strValue1;
            this.arr.push(sentData);
            sentData = { name: '', id: '', value: '' };
            let u = 0;
            for (let z = 0; z < strLength1; z = u) {
              let str2 = strValue1.substr(u, 2);
              let strLength2 = parseInt(strValue1.substr(u + 2, 2));
              let strValue2 = strValue1.substr(u + 4, strLength2);
              u = u + 4 + strLength2;
              console.log(str2, strLength2, strValue2);
              switch (str2) {
                case '00': {
                  console.log('globallyUniqueIdentifier = ' + strValue2);
                  sentData.name = 'globallyUniqueIdentifier';
                  sentData.id = str2;
                  sentData.value = strValue2;
                  this.arr.push(sentData);
                  sentData = { name: '', id: '', value: '' };
                  break;
                }
                case '01': {
                  console.log('SAQRCodeID = ' + strValue2);
                  sentData.name = 'SAQRCodeID';
                  sentData.id = str2;
                  sentData.value = strValue2;
                  this.arr.push(sentData);
                  sentData = { name: '', id: '', value: '' };
                  break;
                }
                case '02': {
                  console.log('SAQRVersion = ' + strValue2);
                  sentData.name = 'SAQRVersion';
                  sentData.id = str2;
                  sentData.value = strValue2;
                  this.arr.push(sentData);
                  sentData = { name: '', id: '', value: '' };
                  break;
                }
                case '03': {
                  console.log('InstanceID = ' + strValue2);
                  sentData.name = 'InstanceID';
                  sentData.id = str2;
                  sentData.value = strValue2;
                  this.arr.push(sentData);
                  sentData = { name: '', id: '', value: '' };
                  break;
                }
              }
            }
            break;
          }
          case '62': {
            sentData.name = 'additionalDataFieldTemplate';
            sentData.id = str1;
            sentData.value = strValue1;
            this.arr.push(sentData);
            sentData = { name: '', id: '', value: '' };
            let u = 0;
            for (let z = 0; z < strLength1; z = u) {
              let str2 = strValue1.substr(u, 2);
              let strLength2 = parseInt(strValue1.substr(u + 2, 2));
              let strValue2 = strValue1.substr(u + 4, strLength2);
              u = u + 4 + strLength2;
              console.log(str2, strLength2, strValue2);
              switch (str2) {
                case '06': {
                  console.log('customerLabel = ' + strValue2);
                  sentData.name = 'customerLabel';
                  sentData.id = str2;
                  sentData.value = strValue2;
                  this.arr.push(sentData);
                  sentData = { name: '', id: '', value: '' };
                  break;
                }
                case '07': {
                  console.log('terminalLabel = ' + strValue2);
                  sentData.name = 'terminalLabel';
                  sentData.id = str2;
                  sentData.value = strValue2;
                  this.arr.push(sentData);
                  sentData = { name: '', id: '', value: '' };
                  break;
                }
                case '08': {
                  console.log('purposeofTransaction = ' + strValue2);
                  sentData.name = 'purposeofTransaction';
                  sentData.id = str2;
                  sentData.value = strValue2;
                  this.arr.push(sentData);
                  sentData = { name: '', id: '', value: '' };
                  break;
                }
              }
            }
            break;
          }
        }
      }
      console.log(sentData);
      console.log(this.arr);

      let type = this.arr[18].value;
      if (type == 'COUT_WALLET' || type == 'PAY_MRCHNT_OUT') {
        this.cashBackObj.Type = this.arr[18].value;
        this.cashBackObj.WalletNum = this.arr[8].value;
        this.cashBackObj.Amount = this.arr[11].value;
        this.cashBackObj.Currency = this.arr[10].value;
        this.cashBackObj.UID = this.arr[17].value;
        this.scannedData = this.cashBackObj;
      } else if (type == 'mWallet') {
        this.merchantWalletObj.Type = this.arr[18].value;
        this.merchantWalletObj.WalletNum = this.arr[8].value;
        this.merchantWalletObj.UID = this.arr[17].value;
        this.scannedData = this.merchantWalletObj;
        console.log(this.scannedData);
      } else if (type == 'ATM') {
        this.atmtObj.Type = this.arr[18].value;
        this.atmtObj.ID = this.arr[17].value;
        this.atmtObj.ID = this.atmtObj.ID.replace(/^\b0+/g, '');
        this.scannedData = this.atmtObj;
      }
      // else {
      // 	this.scannedData = JSON.parse(this.data);
      // 	console.log("alaaaaaaaaaaaa")
      // 	console.log(this.scannedData)
      // }
      let ress = this.arr[19].value;
      console.log(ress);
      console.log(CRCResult);
      if (ress == CRCResult) {
        this.crcCheck = true;
        console.log(this.crcCheck);
      } else {
        this.crcCheck = false;
        console.log(this.crcCheck);
        console.log(CRCResult);
      }
    },
  };

  //-------------------------------------- Copied from crc file in the old app

  CRCMaster = {
    StringToCheck: '',
    CleanedString: '',
    CRCTableDNP: [],
    init() {
      this.CRCDNPInit();
    },
    CleanString(inputType) {
      if (inputType == 'ASCII') {
        this.CleanedString = this.StringToCheck;
      } else if (this.StringToCheck.match(/^[0-9A-F \t]+$/gi) !== null) {
        this.CleanedString = this._hexStringToString(this.StringToCheck.toUpperCase().replace(/[\t ]/g, ''));
      } else {
        window.alert("String doesn't seem to be a valid Hex input.");
        return false;
      }
      return true;
    },
    CRC8() {
      const str = this.CleanedString;
      let CRC = 0;
      for (let j = 0; j < str.length; j++) {
        CRC += str.charCodeAt(j);
        CRC &= 0xff;
      }
      return CRC;
    },
    CRC16() {
      let crc = 0x0000;
      const str = this.CleanedString;
      for (let pos = 0; pos < str.length; pos++) {
        crc ^= str.charCodeAt(pos);
        for (let i = 8; i !== 0; i--) {
          if ((crc & 0x0001) !== 0) {
            crc >>= 1;
            crc ^= 0xa001;
          } else crc >>= 1;
        }
      }
      return crc;
    },
    CRC16Sick() {
      let crc = 0;
      let c = 0;
      const str = this.CleanedString;
      for (let i = 0; i < str.length; i++) {
        c <<= 8;
        c |= str.charCodeAt(i);
        if (crc & 0x8000) {
          crc <<= 1;
          crc ^= 0x8005;
          crc ^= c;
        } else {
          crc <<= 1;
          crc ^= c;
        }
      }
      crc &= 0xffff;
      crc = (crc << 8) | (crc >> 8);
      return crc & 0xffff;
    },
    CRC16Modbus() {
      let crc = 0xffff;
      const str = this.CleanedString;
      for (let pos = 0; pos < str.length; pos++) {
        crc ^= str.charCodeAt(pos);

        for (let i = 8; i !== 0; i--) {
          if ((crc & 0x0001) !== 0) {
            crc >>= 1;
            crc ^= 0xa001;
          } else crc >>= 1;
        }
      }
      return crc;
    },
    CRCXModem() {
      const str = this.CleanedString;
      let crc = 0;
      for (let c = 0; c < str.length; c++) {
        crc ^= str.charCodeAt(c) << 8;
        for (let i = 0; i < 8; i++) {
          if (crc & 0x8000) crc = (crc << 1) ^ 0x1021;
          else crc <<= 1;
        }
      }
      return crc & 0xffff;
    },
    CRCFFFF() {
      const str = this.CleanedString;
      let crc = 0xffff;
      for (let c = 0; c < str.length; c++) {
        crc ^= str.charCodeAt(c) << 8;
        for (let i = 0; i < 8; i++) {
          if (crc & 0x8000) crc = (crc << 1) ^ 0x1021;
          else crc <<= 1;
        }
      }
      return crc & 0xffff;
    },
    CRC1D0F() {
      const str = this.CleanedString;
      let crc = 0x1d0f;
      for (let c = 0; c < str.length; c++) {
        crc ^= str.charCodeAt(c) << 8;
        for (let i = 0; i < 8; i++) {
          if (crc & 0x8000) crc = (crc << 1) ^ 0x1021;
          else crc <<= 1;
        }
      }
      return crc & 0xffff;
    },
    CRCKermit() {
      const str = this.CleanedString;
      let crc = 0;
      for (let c = 0; c < str.length; c++) {
        crc ^= str.charCodeAt(c) & 0xff;
        for (let i = 0; i < 8; i++) {
          const a = crc & 0x0001;
          const b = 0;
          if (a !== b) crc = (crc >>> 1) ^ 0x8408;
          else crc >>>= 1;
        }
      }
      crc = (crc << 8) | (crc >> 8);
      return crc & 0xffff;
    },
    CRCDNPInit() {
      let i;
      let j;
      let crc;
      let c;
      for (i = 0; i < 256; i++) {
        crc = 0;
        c = i;
        for (j = 0; j < 8; j++) {
          if ((crc ^ c) & 0x0001) crc = (crc >> 1) ^ 0xa6bc;
          else crc >>= 1;
          c >>= 1;
        }
        this.CRCTableDNP[i] = crc;
      }
    },
    CRCDNP() {
      const str = this.CleanedString;
      let crc = 0;
      let tmp = 0;
      for (let c = 0; c < str.length; c++) {
        crc ^= str.charCodeAt(c) & 0xff;
        tmp = crc & 0xff;
        crc = (crc >> 8) ^ this.CRCTableDNP[tmp];
      }
      crc = (crc << 8) | (crc >> 8);
      crc &= 0xffff;
      return 0xffff - crc;
    },
    CRC32() {
      const str = this.CleanedString;
      const table =
        '00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D';
      const bytes = this._stringToBytes(str);
      let crc = 0;
      let n = 0;
      let x;
      crc ^= -1;
      for (let i = 0, iTop = bytes.length; i < iTop; i++) {
        n = (crc ^ bytes[i]) & 0xff;
        x = `0x${table.substr(n * 9, 8)}`;
        crc = (crc >>> 8) ^ x;
      }
      crc ^= -1;
      if (crc < 0) {
        crc += 4294967296;
      }
      return crc;
    },
    _stringToBytes(str) {
      let ch;
      let st;
      let re = [];
      for (let i = 0; i < str.length; i++) {
        ch = str.charCodeAt(i);
        st = [];
        do {
          st.push(ch & 0xff);
          ch >>= 8;
        } while (ch);
        re = re.concat(st.reverse());
      }
      return re;
    },
    _hexStringToString(inputstr) {
      const hex = inputstr.toString();
      let str = '';
      for (let i = 0; i < hex.length; i += 2) {
        // add {}
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      }
      return str;
    },
    /**
     * str: the frame to compute
     * inputType: "ASCII" or "hex"
     * */
    Calculate(str, inputType) {
      this.StringToCheck = str;
      if (this.CleanString(inputType)) {
        return {
          //    crc8: this.CRC8().toString().toUpperCase(),
          //    crccittxmodem: "0x"+ this.CRCXModem().toString(16).toUpperCase(),
          crc16: `${this.CRC16().toString(16).toUpperCase()}`,
          //    crc16sick: "0x"+ this.CRC16Sick().toString(16).toUpperCase(),
          //    crc16modbus: "0x"+ this.CRC16Modbus().toString(16).toUpperCase(),
          //    crccittffff: "0x"+ this.CRCFFFF().toString(16).toUpperCase(),
          //    crccitt1d0f: "0x"+ this.CRC1D0F().toString(16).toUpperCase(),
          //    crckermit: "0x"+ this.CRCKermit().toString(16).toUpperCase(),
          //    crcdnp: "0x"+ this.CRCDNP().toString(16).toUpperCase(),
          //    crc32: "0x"+ this.CRC32().toString(16).toUpperCase()
        };
      }
    },
  };
}
