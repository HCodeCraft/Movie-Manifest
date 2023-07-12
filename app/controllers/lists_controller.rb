class ListsController < ApplicationController

    def index
        lists = List.all
        render json: lists, include: ['movies', 'movies.review']
    end

    def create

    end

    def show
        list = List.find_by(id: params[:id])
        if list
            render json: list
        else
            render json: { errors: "List not found"}
        end
    end


end
