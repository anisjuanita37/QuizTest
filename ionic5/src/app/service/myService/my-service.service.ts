import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LEVELS, QUESTIONS } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class MyService {

  constructor(private http: HttpClient) {

  }

  /**
   * Gets the levels.json for Quiz Level
   * @returns Array of levels
   */
  getLevels() {
    return this.http.get(LEVELS);
  }

  /**
   * Gets the questions.json for test page     *
   * @returns Array of questions and answers
   */
  getQuestions() {
    return this.http.get(QUESTIONS);
  }

}