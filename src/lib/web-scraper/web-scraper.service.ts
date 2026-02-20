import { Injectable } from '@nestjs/common';
import { Client as ElasticSearchClient } from '@elastic/elasticsearch';
import { from, mergeMap, of } from 'rxjs';

@Injectable()
export class WebScraperService {
  private index: string;
  private client: ElasticSearchClient;

  constructor(clientNodeUrl: string, elasticSearchIndex: string) {
    this.index = elasticSearchIndex;
    this.client = new ElasticSearchClient({ node: clientNodeUrl });
  }

  scrape(targets: Readonly<string[]>) {
    return from(targets).pipe(
      mergeMap((target) => this.hitElastic(target)),
      mergeMap((response) => of(...response.hits.hits)),
    );
  }

  private hitElastic(target: string) {
    return this.client.search({
      index: this.index,
      from: 0,
      size: 10000,
      query: { match: { category: target } },
    });
  }
}
