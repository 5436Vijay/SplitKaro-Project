function change(what){
    var current = document.getElementById("count").value;
    var current = parseInt(current);
    if(what == "u"){
        if (current > 1 && current < 10) {
        var neu = current+1;
        document.getElementById("count").value= neu;
        }
        }
    else {
        if (current > 2 && current < 11) {
        var neu = (current)-1;
        document.getElementById("count").value= neu;
        }
        }
    }


    var alertPlaceholder = document.getElementById('liveAlertPlaceholder')

    function alert(message, type) {
      var wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')
    
      alertPlaceholder.append(wrapper)
    }

    function splitPage() {
      window.location.href = `split.html?group=${document.getElementById("count").value}`;
    }

    function createGroups() {
      var groupForm = document.getElementById('form-div-id');
      var noOfGroups = window.location.search.split('=')[1] || 2;
      var groupHTML = [];
      var groupHTMLstring = (itr) => `<div class="person-form">
          <div class="mb-3" style="width: 47%; display: inline-block">
            <label for="exampleInputEmail1" class="form-label">Name</label>
            <input type="text" class="form-control" id="person-name-user${itr}" value="Name ${itr + 1}">
          </div>
          <span 
            style="display: inline-block; padding: 13px; margin-left: 16px" 
            class="badge bg-secondary"
            id="person-total-${itr}"
            value="0"
          >
          Total 0
          </span> 
          <div id="add-row-user${itr}">
            <div class="row">
                <div class="col">
                  <input type="text" class="form-control" placeholder="What?" aria-label="What?" id="person-what-user${itr}-0">
                </div>
                <div class="col">
                  <input type="number" oninput="updateTotal(${itr})" class="form-control" placeholder="How much?" aria-label="How much?" id="person-how-much-user${itr}-0">
                </div>
            </div>
          </div>
          <br />
          <button onclick="addRow(${itr})" class="btn btn-primary mb-3">+ More</button>
      </div>`;
      for(var i = 0; i < parseInt(noOfGroups); i++) {
        groupHTML.push(groupHTMLstring(i));
      }
      groupForm.innerHTML = groupHTML.join('');
    }

    function addRow(itr) {
      let i = 1;
      let addRowElem = document.getElementById(`add-row-user${itr}`);
      let count = addRowElem.childElementCount;
      var rowString = `
            <div class="row">
                <div class="col">
                  <input type="text" class="form-control" placeholder="What?" aria-label="What?" id="person-what-user${itr}-${count}">
                </div>
                <div class="col">
                  <input type="number" oninput="updateTotal(${itr})" class="form-control" placeholder="How much?" aria-label="How much?" id="person-how-much-user${itr}-${count}">
                </div>
            </div>`;
        const placeholder = document.createElement("div");
        placeholder.innerHTML = rowString;
        const node = placeholder.firstElementChild;
      addRowElem.appendChild(node);
    }

    function updateTotal(itr) {
      let addRowElem = document.getElementById(`add-row-user${itr}`);
      let count = addRowElem.childElementCount;
      let total = 0;
      for(let i = 0; i < count; i++) {
        let value = document.getElementById(`person-how-much-user${itr}-${i}`).value;
        total+= parseInt(value);
      }
      document.getElementById(`person-total-${itr}`).innerHTML = `Total ${total}`;
      document.getElementById(`person-total-${itr}`).value = `${total}`;
    }

    function displayReturn() {
      var noOfGroups = window.location.search.split('=')[1] || 2;
      let totalSpend = 0;
      for(let i=0; i<noOfGroups; i++) {
        const tempTotal = document.getElementById(`person-total-${i}`).value;
        if (tempTotal) totalSpend += parseInt(tempTotal);
      }
      let perPerson = totalSpend / noOfGroups;
      console.log('total Spend', totalSpend);
      console.log('Per person', totalSpend / noOfGroups);
      const nameUser1 = document.getElementById(`person-name-user0`).value;
      const user1Expense = parseInt(document.getElementById(`person-total-0`).value) || 0;
      const nameUser2 = document.getElementById(`person-name-user1`).value;
      const user2Expense = parseInt(document.getElementById(`person-total-1`).value) || 0;

      console.log('Name user ', nameUser1, nameUser2);
      const returnElem = document.getElementById(`the-return`);
      const returnText = (name1, name2, amount) => `
        <div class="ergi">
          <div class="deb">${name1}</div>
          <div class="pfeil">
            <div class="pfeilanfang">${amount}</div>
            <div class="pfeilspitze"></div>
          </div>
          <div class="cred">${name2}</div>
        </div>
      `;
      const placeholder = document.createElement("div");
      if (user1Expense > perPerson) {
        returnElem.innerHTML = returnText(nameUser2, nameUser1, user1Expense - perPerson);
      } else {
        returnElem.innerHTML = returnText(nameUser1, nameUser2, user2Expense - perPerson);
      }
    }
  
    createGroups();