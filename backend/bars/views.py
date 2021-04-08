from rest_framework import status, viewsets
from rest_framework.response import Response

from core.permissions import IsWorker

from .models import Bar
from .renderers import BarJSONRenderer
from .serializers import BarSerializer

class BarViewSet(viewsets.ModelViewSet): #Retrieve & List & Create Bar
    queryset = Bar.objects.all()
    serializer_class = BarSerializer
    lookup_field = 'slug'


    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = [IsWorker,]

        return super(BarViewSet, self).get_permissions()

    def create(self, request): #Create Bar
        self.check_object_permissions(request,"")

        serializer_context = {
            'owner': request.user.worker,
            'request': request
        }
        serializer_data = request.data.get('bar', {})

        serializer = self.serializer_class(
        data=serializer_data, context=serializer_context
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)