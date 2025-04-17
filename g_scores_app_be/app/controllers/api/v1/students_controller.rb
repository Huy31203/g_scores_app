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
      res = {
        registration_number: student.registration_number,
        subjects: student.subjects.map { |subject| { name: subject.name, score: subject.score } },
        total_group_a_score: student.total_group_a_score
      }

      render_success(res, "Student details")
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
    # Cache the top 10 students for 10 minutes
    res = Rails.cache.fetch("top_ten_students", expires_in: 1.hours) do
      students = Student
                  .joins(:subjects)
                  .select('students.*, SUM(CASE WHEN subjects.name IN ("math", "physics", "chemistry") THEN subjects.score ELSE 0 END) AS total_group_a_score')
                  .group("students.id")
                  .order("total_group_a_score DESC")
                  .limit(10)

      students.as_json(
        methods: [ :total_group_a_score ],
        include: { subjects: { only: [ :name, :score ] } }
      )
    end

    render_success(res, "Top 10 Group A students")
  rescue StandardError => e
    # Log the error
    Rails.logger.error "Error getting top 10 students: #{e.message}"
    Rails.logger.error e.backtrace.join("\n")

    # Respond with an error message
    render_error("Failed to get top 10 students", 500)
  end
end
