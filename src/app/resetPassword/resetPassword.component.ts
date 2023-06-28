import { Component, DoCheck, OnInit } from "@angular/core";
import { loginService } from "../services/loginService/login.service";
import { Router } from "@angular/router";
import { dataService } from "../services/dataService/data.service";
import { ConfirmationDialogsService } from "../services/dialog/confirmation.service";
import { SetLanguageComponent } from "app/set-language.component";
import { HttpServices } from "app/services/http-services/http_services.service";

@Component({
  selector: "ResetComponent",
  templateUrl: "./resetPassword.html",
  styles: ["body{ background:red !important; }"],
})
export class ResetComponent {

  constructor(
    public loginservice: loginService,
    public getUserData: dataService,
    public router: Router,
    public alertService: ConfirmationDialogsService,
    private httpServices: HttpServices
  ) {}

  public response: any;
  public error: any;
  securityQuestions: any;
  showQuestions: boolean = false;
  hideOnGettingQuestions: boolean = true;
  questionsAnswers: any;
  userFinalAnswers: any[] = [];
  public questionId: any[] = [];
  answer: any = undefined;

  dynamictype: any = "password";

  public questions: any[] = [];
  public correctAnswers: any[] = [];
  public userAnswers: any[] = [];

  wrong_answer_msg: any = "";
  
  getQuestions(username: any) {
    this.getUserData.uname = username;

    this.loginservice.getSecurityQuestions(username).subscribe(
      (response: any) =>  this.handleSuccess(response),
      (error: any) => (this.error = <any>error)
    );
  }

  handleSuccess(data: any) {
		console.log(data);
		if (data.forgetPassword != "user Not Found") {
			if (data.SecurityQuesAns.length > 0) {
				this.securityQuestions = data.SecurityQuesAns;
				this.showQuestions = true;
				this.hideOnGettingQuestions = false;

				this.splitQuestionAndQuestionID();
			}
			else {
				this.router.navigate(["/"]);
				this.alertService.alert("Questions are not set for this user");
			}
		}
		else {
			this.router.navigate(["/"]);
			this.alertService.alert("User not found");
		}
	}

  showPWD() {
    this.dynamictype = "text";
  }

  hidePWD() {
    this.dynamictype = "password";
  }

  splitQuestionAndQuestionID() {
		console.log('Q n A', this.securityQuestions);
		for (var i = 0; i < this.securityQuestions.length; i++) {
			this.questions.push(this.securityQuestions[i].question);
			this.questionId.push(this.securityQuestions[i].questionId);
		}
		console.log('questions', this.questions);
		console.log('questionID', this.questionId);
		this.showMyQuestion();
	}

  bufferQuestion: any;
  bufferQuestionId: any;
  counter: number = 0;

  showMyQuestion() {
		console.log('this is question' + (this.counter + 1));
		this.bufferQuestion = this.questions[this.counter];
		this.bufferQuestionId = this.questionId[this.counter];
	}
  nextQuestion() {
		if (this.counter < 3) {
			let reqObj = {
				"questionId": this.questionId[this.counter],
				"answer": this.answer,
			}
			this.userFinalAnswers.push(reqObj);
			this.wrong_answer_msg = "";
			this.counter = this.counter + 1;
			if (this.counter < 3) {
				this.showMyQuestion();
				this.answer = undefined;
			}
			else {
				this.checking();
			}
		}
		console.log('user Final Answers are:', this.userFinalAnswers);	
	}
  checking() {
		this.loginservice.validateSecurityQuestionAndAnswer(this.userFinalAnswers, this.getUserData.uname.trim()).
			subscribe((response: any) => {
				if (response.statusCode == 200) {
					this.counter = 0;
					this.getUserData.transactionId = response.data.transactionId;
					this.router.navigate(["/setPassword"]);
					
				}
				else {
					this.showQuestions = true;
					this.counter = 0;
					this.alertService.alert(response, 'error');
					this.getQuestions(this.getUserData.uname.trim());
					this.splitQuestionAndQuestionID();
					this.router.navigate(["/resetPassword"]);

				}
			},
				(error: any) => {
					this.showQuestions = true;
					this.counter = 0;
					this.alertService.alert(error.errorMessage, 'error');
					this.splitQuestionAndQuestionID();
					this.router.navigate(["/resetPassword"]);
				}
			);

		this.answer = undefined;
		this.userFinalAnswers = [];

	}
  
}