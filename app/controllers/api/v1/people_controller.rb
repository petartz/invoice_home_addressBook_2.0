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
        person = current_user.people.new(person_params)

        if person.save
          render json: current_user.people.new(person)
        else
          render json: {error: person.errors.mesages}, status:422
        end
      end

      def update
        person = current_user.people.find(params[:id])

        if person.update(person_params)
          render json: current_user.people.new(person)
        else
          render json: {error: person.errors.mesages}, status:422
        end
      end

      def destroy
        person = current_user.people.find(params[:id])

        if person.destroy
          head :no_content
        else
          render json: {error: person.errors.mesages}, status:422
        end
      end

      private
      # Use callbacks to share common setup or constraints between actions.
      def set_person
        @person = current_user.people.find(params[:id])
      end

      def person_params
        params.require(:person).permit(:salutation, :first_name, :middle_name, :last_name, :ssn, :birth_date, :comment)
      end

    end
  end
end


