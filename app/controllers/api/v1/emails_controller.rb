module Api
  module V1
    class EmailsController < ApplicationController
      def index
        emails = Email.all
        render json: emails
      end

      def show
        email = current_user.people.find(params[:id]).emails
        render json: email
      end

      def create
        email = current_user.people.find(params[:id]).emails.new(email_params)

        if email.save
          render json: current_user.people.new(email)
        else
          render json: {error: email.errors.mesages}, status:422
        end
      end

      def update
        email = current_user.people.find(params[:id]).emails

        if email.update(address_params)
          render json: current_user.people.new(email)
        else
          render json: {error: email.errors.mesages}, status:422
        end
      end

      def destroy
        email = current_user.people.find(params[:id]).emails

        if email.destroy
          head :no_content
        else
          render json: {error: email.errors.mesages}, status:422
        end
      end

      private
      # Use callbacks to share common setup or constraints between actions.
      def set_person
        @email = current_user.people.find(params[:id]).emails
      end

      def person_params
        params.require(:email).permit(:email_address, :comment)
      end

    end
  end
end


