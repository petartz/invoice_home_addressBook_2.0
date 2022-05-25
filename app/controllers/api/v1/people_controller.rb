module Api
  module V1
    class PeopleController < ApplicationController
      def index
        people = current_user.people
        render json: people
      end

      def show
        person = current_user.people.find(params[:id])
        render json: person
      end

      def create
        person = Person.new(person_params)
        if person.save
          render json: person
        else
          render json: {error: person.errors.messages}, status:422
        end
      end

      def destroy
        person = Person.find(params[:id])

        if person.destroy!
          head :no_content
        else
          render json: {error: person.errors.messages}, status:422
        end
      end

      def update
        person = Person.find(params[:id])

        if person.update(person_params)
          render json: person
        else
          render json: {error: person.errors.messages}, status:422
        end
      end


      private
      # Use callbacks to share common setup or constraints between actions.
      def set_person
        person = current_user.people.find(params[:id])
      end

      def person_params
        params.require(:person).permit(:salutation, :first_name, :middle_name, :last_name, :ssn, :birth_date, :comment, :user_id, :id)
      end

    end
  end
end


