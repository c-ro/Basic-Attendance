window.onload = function(){
    var model = {
        students: JSON.parse(localStorage.attendance),

        getLocalStorage: function(){
            return this.students;
        }
    };

    var controller = {
        init: function(){
            view.init();
            var records = model.getLocalStorage();
            // console.log(Object.keys(records).length);
        },

        getRecords: function(){
            return model.getLocalStorage();
        }

    };

    var view = {
        init: function(){
          view.render(); 
        },

        countAbsences: function(student){
            var count = 0;
            
            for(var i = 0; i < student.length; i++){
                if(!student[i]){
                    count++;
                }    
            }
            return count;
        },

        render: function(){
            var records = controller.getRecords();
            this.header = document.getElementById('header');
            this.missed = document.getElementById('missed');
            this.students = document.getElementById('student-list');
            
        // POPULATE HEADER WITH DAYS    
            for(var i = 0; i < records[Object.keys(records)[0]].length; i++){
                this.day = document.createElement('th');
                this.day.innerHTML = i + 1;
                this.header.insertBefore(this.day, this.missed);
            };
        // ADD STUDENTS
            for(var i = 0; i < Object.keys(records).length; i++){
                this.student = records[Object.keys(records)[i]];
                // create ROWS
                this.studentRow = document.createElement('tr');
                this.studentRow.className = 'student';
                // create Student Name Cell
                this.studentName = document.createElement('td');
                this.studentName.className = 'name-col';
                this.studentName.innerHTML = Object.keys(records)[i];
                // add to DOM
                this.students.appendChild(this.studentRow);
                this.studentRow.appendChild(this.studentName);

                // ADD CHECK BOXES FOR STUDENT
                function addDays(row){
                    for(var i = 0; i < records[Object.keys(records)[0]].length; i++){

                        this.inputcell = document.createElement('td');
                        this.inputcell.className = "attend-col";

                        this.checkbox = document.createElement("input");
                        this.checkbox.type = "checkbox";

                        //Apply Data to View
                        if(row.student[i]){
                            this.checkbox.checked = true;
                        }
                        // Add to DOM
                        this.inputcell.appendChild(this.checkbox);
                        row.studentRow.appendChild(this.inputcell);
                    }
                };

                addDays(this);

                // ADD MISSED COLUMN
                this.missed = document.createElement('td');
                this.missed.className = 'missed-col';
                this.missed.innerHTML = view.countAbsences(this.student);
                this.studentRow.appendChild(this.missed);
            }
        }
    };

    controller.init();
};