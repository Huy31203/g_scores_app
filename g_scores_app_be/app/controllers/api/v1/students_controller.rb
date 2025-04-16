REGISTRATION_LENGTH = 8
REGISTRATION_VALIDATION_REGEX = /[a-zA-Z]/

class Api::V1::StudentsController < ApplicationController
  # GET /api/v1/students/:registration_number
  def show
    if params[:id].length != REGISTRATION_LENGTH || params[:id] =~ REGISTRATION_VALIDATION_REGEX
      render_error("Invalid registration number", :bad_request)
      return
    end
    student = Student.find_by(registration_number: params[:id])
    if student
      render_success(student, "Student found")
    else
      render_error("Student not found", :not_found)
    end

  rescue StandardError => e
    # Log the error
    Rails.logger.error "Error getting student scores: #{e.message}"
    Rails.logger.error e.backtrace.join("\n")

    # Respond with an error message
    render_error("Failed to get student scores", 500)
  end

    # GET /api/v1/students/top_ten
    def top_ten
      students = Student.order(total_group_a_score: :desc).limit(10)
      render_success(students, "Top 10 Group A students")

    rescue StandardError => e
    # Log the error
    Rails.logger.error "Error getting top 10 students: #{e.message}"
    Rails.logger.error e.backtrace.join("\n")

    # Respond with an error message
    render_error("Failed to get top 10 students", 500)
    end
end
