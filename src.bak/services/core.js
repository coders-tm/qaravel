import {
  version
} from '../../package.json'
import {
  LocalStorage,
  uid,
  Cookies,
  openURL,
  Notify,
  exportFile,
  date
} from 'quasar'

export default {
  modules: {},
  async init () {
    console.func('services/core:init()', arguments)
    if (Cookies.has('qaravel-gdpr-accept') !== true) {
      Notify.create({
        message: 'We use cookies to improve user experience, manage user sessions and analyze website traffic. By clicking “Accept” you consent to store on your device all the technologies described in our Cookie Policy. Please read our Terms and Conditions and Privacy Policy for full details by clicking the Learn More button.',
        multiline: true,
        classes: 'bg-grey-10',
        timeout: 0,
        position: 'bottom-right',
        actions: [{
          label: 'Accept',
          color: 'yellow',
          handler () {
            Cookies.set('qaravel-gdpr-accept', true, {
              expires: 5 * 365
            })
          }
        },
        {
          label: 'Learn more',
          color: 'grey',
          noDismiss: true,
          handler () {
            openURL(process.env.COOKIE_URL)
          }
        }
        ]
      })
    }
  },
  app: {
    v: version
  },
  error (msg, o) {
    console.func('services/core:error()', arguments)
    this.Vue.$q.dialog({
      component: 'BaseAlert',
      msg: msg,
      icon: 'error',
      title: o && o.title ? o.title : 'Application Error'
    }).onOk(() => {
      console.log('OK')
    })
  },
  random (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  },
  data (min, max, limit) {
    const data = []
    for (let i = 0; i <= limit; i++) {
      data.push(this.random(min, max))
    }
    return data
  },
  slug (obj) {
    return obj
      .toString()
      .trim()
      .toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
  },
  category (obj) {
    const cat = []
    obj.forEach(element => {
      cat.push(element.name)
    })
    return cat.join(', ')
  },
  wrapCsvValue (val, formatFn) {
    let formatted = formatFn !== undefined
      ? formatFn(val)
      : val

    formatted = formatted === undefined || formatted === null
      ? ''
      : String(formatted)

    formatted = formatted.split('"').join('""')
    /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
    // .split('\n').join('\\n')
    // .split('\r').join('\\r')

    return `"${formatted}"`
  },
  export (table, name, type = 'text/csv') {
    const content = [table.columns.map(col => this.wrapCsvValue(col.label))].concat(
      table.data.map(row => table.columns.map(col => this.wrapCsvValue(
        typeof col.field === 'function'
          ? col.field(row)
          : row[col.field === undefined ? col.name : col.field],
        col.format
      )).join(','))
    ).join('\r\n')

    const status = exportFile(
      name + '_' + Date.now() + '.csv',
      content,
      type
    )

    if (status !== true) {
      this.$q.notify({
        message: 'Browser denied file download...',
        color: 'negative',
        icon: 'warning'
      })
    }
  },
  b64toBlob (b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data)
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize)

      const byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }

      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }

    const blob = new Blob(byteArrays, {
      type: contentType
    })
    return blob
  },
  getBlobURL (data) {
    const blob = this.b64toBlob(data, 'text/plain')
    const url = URL.createObjectURL(blob)
    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 10000)
    return url
  },
  getDate (d) {
    if (d && typeof d === 'string') {
      if (d.indexOf('-') !== -1) {
        d = date.extractDate(d, 'YYYY-MM-DD')
      } else if (d.indexOf('/') !== -1) {
        d = date.extractDate(d, 'DD/MM/YYYY')
      }
    } else if (!d || typeof d === 'string') {
      d = new Date()
    }

    return d
  },
  length (obj, o) {
    var len = 0
    if (obj && typeof obj.length === 'undefined') {
      Object.keys(obj).forEach(function (key) {
        len++
      })
    } else if (obj) {
      len = obj.length
    }
    return len
  },
  sort (arr, field, dir) {
    console.log('core.sort()', arguments)
    if (dir) {
      return arr.sort((a, b) => (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0))
    } else {
      return arr.sort((a, b) => (a[field] > b[field]) ? -1 : ((b[field] > a[field]) ? 1 : 0))
    }
  },
  humanSize (Num = 0, dec = 2) {
    if (Num < 1000) return Num + ' Bytes'
    Num = ('0'.repeat((Num += '').length * 2 % 3) + Num).match(/.{3}/g)
    return Number(Num[0]) + '.' + Num[1].substring(0, dec) + ' ' + '  kMGTPEZY'[Num.length] + 'B'
  },
  valid: {
    email: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    }
  },
  cookie (key, value, days) {
    console.func('services/core:cookie()', arguments)
    var obj = typeof key === 'object' ? key : {
      key,
      value,
      days
    }
    if (typeof obj.value === 'undefined') {
      var keyValue = document.cookie.match('(^|;) ?' + obj.key + '=([^;]*)(;|$)')
      return keyValue ? keyValue[2] : null
    } else {
      var expires = new Date()
      if (obj.value === null) {
        obj.days = -10000
      } else {
        obj.days = expires.getTime() + (isNaN(obj.days) ? 10 : obj.days) * 24 * 60 * 60 * 1000
      }
      expires.setTime(obj.days)
      document.cookie = obj.key + '=' + obj.value + ';expires=' + expires.toUTCString() + ';path=/'
    }
  },
  formatDate (d, type) {
    var format = 'DD/MM/YYYY'

    switch (type) {
      case 'sql':
        format = 'YYYY-MM-DD'
        break
    }
    if (d && typeof d === 'string') {
      d = this.getDate(d)
    }
    if (typeof d.getMonth === 'function') {
      d = date.formatDate(d, format)
    }

    return d
  },
  localData (key, value) {
    console.func('services/core:localData()', arguments)
    var obj = typeof key === 'object' ? key : {
      key,
      value
    }

    if (typeof obj.value === 'undefined') {
      // GET
      return LocalStorage.has(obj.key) ? LocalStorage.getItem(obj.key) : null
    } else {
      if (obj.value === null) {
        // DELETE
        if (LocalStorage.has(obj.key)) {
          localStorage.removeItem(obj.key)
        }
      } else {
        // SET
        LocalStorage.set(obj.key, obj.value)
      }
    }
  },
  openURL (url) {
    console.func('services/core:openURL()', arguments)
    openURL(url)
  },
  uid () {
    console.func('services/core:uid()', arguments)
    const tuid = LocalStorage.has('uid') && LocalStorage.getItem('uid') ? LocalStorage.getItem('uid') : (window.device && window.device.uuid ? window.device.uuid : uid())
    LocalStorage.set('uid', tuid)
    return tuid
  },
  user (key) {
    console.func('services/core:user()', arguments)
    const user = this.store.state.SessionData.user
    return user && key ? user[key] : user
  }
}
