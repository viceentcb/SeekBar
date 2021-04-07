from rest_framework import status, viewsets
from rest_framework.response import Response

from .models import Bar
from .renderers import BarJSONRenderer
from .serializers import BarSerializer

class BarViewSet(viewsets.ModelViewSet):
    queryset = Bar.objects.all()
    serializer_class = BarSerializer
    lookup_field = 'slug'


    # def get_queryset(self):
    #     queryset = self.queryset

    #     owner = self.request.query_params.get('owner', None)
    #     if owner is not None:
    #         queryset = queryset.filter(owner__user__username=owner)

    #     return queryset

    def create(self, request):
        serializer_context = {
            'owner': request.user.profile,
            'request': request
        }
        serializer_data = request.data.get('bar', {})

        serializer = self.serializer_class(
        data=serializer_data, context=serializer_context
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)